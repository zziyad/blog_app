/* eslint-disable no-unused-vars */
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
const ERR_INIT = 'Can not initialize an Application';
class Error extends global.Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}
const SANDBOX = { Error, node, npm, metarhia };
let lib;
let domain;


const execute = async (method) =>
  method().catch((error) => {
    const msg = `Failed to execute method: ${error?.message}`;
    this.console.error(msg, error.stack);
    return Promise.reject(error);
  });


const parallel = async (promises, errorMessage = ERR_INIT) => {
  const results = await Promise.allSettled(promises);
  const errors = results.filter(({ status }) => status === 'rejected');
  if (errors.length > 0) {
    for (const { reason } of errors) this.console.error(reason);
    throw new Error(errorMessage);
  }
};

(async () => {


  const sandboxCreate = () => {
    const sandbox = { ...SANDBOX, console: logger, common };
    sandbox.api = Object.freeze({});
    sandbox.lib = lib;
    sandbox.domain = domain;
    return sandbox;
  };

  const init = async () => {
    const sandbox = sandboxCreate();
    lib = await loadDir(libPath, sandbox);
    domain = await loadDir(domainPath, sandbox);
    const config = await loadDir(configPath, sandbox);
    // const db = require('./lib/db.js')(config.db);
    // sandbox.db = Object.freeze(db);
    sandbox.config = config;
    // parallel([
    // ]);
    // sandbox.lib = Object.freeze(lib);
    // sandbox.domain = Object.freeze(domain);
    const routing = await loadDir(apiPath, sandbox, true);
    const server = new Server(appPath, routing, logger);
    const [port] = config.server.ports;
    server.listen(port);
    console.log(`API on port ${port}`);
  };

  init();
})();
