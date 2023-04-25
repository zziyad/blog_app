'use strict';

const path = require('node:path');

const console = require('./lib/logger.js');
const common = require('./lib/common.js');
const { node, npm, metarhia } = require('./src/dependencies.js');

const { loadDir } = require('./src/loader.js');
const { Server } = require('./src/server.js');

const appPath = path.join(process.cwd(), '../NodeJS-Application');

const api = Object.freeze({});
const sandbox = {
  console, common, api, node, npm, metarhia, db: null, lib: {}, domain: {}
};

(async () => {
  const configPath = path.join(appPath, './config');
  const libPath = path.join(appPath, './lib');
  const domainPath = path.join(appPath, './domain');

  const config = await loadDir(configPath, sandbox);
  const db = require('./lib/db.js')(config.db);

  sandbox.db = Object.freeze(db);
  sandbox.config = config;

  sandbox.lib = Object.freeze(await loadDir(libPath, sandbox));
  sandbox.domain = Object.freeze(await loadDir(domainPath, sandbox));

  const apiPath = path.join(appPath, './api');
  const routing = await loadDir(apiPath, sandbox, true);

  const application = { path: appPath, sandbox, console, config, routing };
  application.server = new Server(application);
})();
