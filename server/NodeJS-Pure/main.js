'use strict';

const path = require('node:path');

const { node, npm, metarhia } = require('./src/dependencies.js');
const logger = require('./lib/logger.js');
const common = require('./lib/common.js');

const { loadDir } = require('./src/loader.js');
const { Server } = require('./src/server.js');

const appPath = path.join(process.cwd(), '../NodeJS-Application');
const apiPath = path.join(appPath, './api');
const configPath = path.join(appPath, './config');
const libPath = path.join(appPath, './lib');
const domainPath = path.join(appPath, './domain');

(async () => {
  const sandbox = {
    console: Object.freeze(logger),
    common: Object.freeze(common),
    node: Object.freeze(node),
    npm: Object.freeze(npm),
    metarhia: Object.freeze(metarhia),
  };

  const config = await loadDir(configPath, sandbox);
  const db = require('./lib/db.js')(config.db);

  sandbox.api = Object.freeze({});
  sandbox.db = Object.freeze(db);
  sandbox.config = config;

  sandbox.lib = Object.freeze(await loadDir(libPath, sandbox));
  sandbox.domain = Object.freeze(await loadDir(domainPath, sandbox));

  const routing = await loadDir(apiPath, sandbox, true);
  const server = new Server(appPath, routing, logger);
  const [port] = config.server.ports;
  server.listen(port);
  console.log(`API on port ${port}`);
})();
