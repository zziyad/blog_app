'use strict';

const path = require('node:path');
const metasql = require('metasql');

const schemaPath = path.join(process.cwd(), 'schemas');
const dbPath = path.join(process.cwd(), 'db');
metasql.create(schemaPath, dbPath);