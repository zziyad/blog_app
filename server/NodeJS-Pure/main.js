'use strict';

const fsp = require('node:fs').promises;
const path = require('node:path');
const vm = require('node:vm');
const console = require('./lib/logger.js');
const common = require('./lib/common.js');
const { node, npm, metarhia } = require('./src/dependencies.js');
const { loadDir, createRouting, starts } = require('./src/loader.js');
const { Server } = require('./src/server.js');

const sandbox = vm.createContext({
  console, common, npm, node, metarhia, db: null
});

(async () => {
  const applications = await fsp.readFile('.applications', 'utf8');
  const appPath = path.join(process.cwd(), applications.trim());

  const configPath = path.join(appPath, './config');
  const config = await loadDir(configPath, sandbox);

  const libPath = path.join(appPath, './lib');
  const lib = await loadDir(libPath, sandbox);

  const domainPath = path.join(appPath, './domain');
  const domain = await loadDir(domainPath, sandbox);

  // sandbox.db = require('./lib/db.js');

  const apiPath = path.join(appPath, './api');
  const api = await loadDir(apiPath, sandbox, true);
  const routing = createRouting(api);
  const application = {
    path: appPath, sandbox, console, routing, config, starts
  };
  Object.assign(sandbox, { api, lib, domain, config, application });
  application.server = new Server(application);
  // starts functions execut on starts of application
  application.starts.map((fn) => common.execute(fn));
  application.starts = [];
})();
