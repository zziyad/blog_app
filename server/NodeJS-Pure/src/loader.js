'use strict';

const fsp = require('node:fs').promises;
const vm = require('node:vm');
const path = require('node:path');

// const application = {
let starts = [];
// };

const parsePath = (relPath) => {
  const name = path.basename(relPath, '.js');
  const names = relPath.split(path.sep);
  names[names.length - 1] = name;
  return names;
};
const STARTS_DEPTH = 1;
const OPTIONS = {
  timeout: 5000,
  displayErrors: false,
};

// const domainTree = {};
// const libTree = {};
// let level;

const load = async (filePath, sandbox, contextualize = false) => {
  const libDomain = filePath.substring(54);
  const src = await fsp.readFile(filePath, 'utf8');
  const opening = contextualize ? '(context) => ' : '';
  const code = `'use strict';\n${opening}${src}`;
  const script = new vm.Script(code, { ...OPTIONS, lineOffset: -1 });
  // console.log(code);
  const exports = script.runInContext(sandbox, OPTIONS);

  const lib = libDomain.includes('lib');
  const domain = libDomain.includes('domain');

  if (lib || domain) {
    const index = libDomain.indexOf('/');
    const relPath = libDomain.substring(index + 1);
    const names = parsePath(relPath);
    const last = names.length - 1;

    for (let depth = 0; depth <= last; depth++) {
      const name = names[depth];
      if (depth <= STARTS_DEPTH && name === 'start') {
        if (exports.constructor.name === 'AsyncFunction') {
          console.log({ exports });
          starts.push(exports);
        } else console.error(`${relPath} expected to be an async function`);
      }
    }
  }

  return exports;
};

const loadDir = async (dir, sandbox, contextualize = false) => {
  const files = await fsp.readdir(dir, { withFileTypes: true });
  const container = {};

  for (const file of files) {
    const { name } = file;

    if (file.isFile() && !name.endsWith('.js')) {
      continue;
    }

    const location = path.join(dir, name);
    const key = path.basename(name, '.js');
    const loader = file.isFile() ? load : loadDir;
    container[key] = await loader(location, sandbox, contextualize);
  }
  return container;
};

const createRouting = (container, path = '', routing = new Map()) => {
  for (const [key, value] of Object.entries(container)) {
    const location = path ? `${path}.${key}` : key;

    if (typeof value === 'function') {
      routing.set(location, value);
    } else {
      createRouting(value, location, routing);
    }
  }

  return routing;
};

module.exports = {
  loadDir,
  createRouting,
  starts,
};
