'use strict';
const keyspaceMigrationService = require('./lib/service/keyspaceMigrationService'),
    assert = require('assert'),
    timerLabel = 'data-migration';

let keyspace = process.argv[2];
let fromHost = process.argv[3];
let toHost = process.argv[4];

let usage = 'usage: npm start <KEYSPACE> <FROM_HOST> <TO_HOST> \n';

function executeMigration(keyspace, fromHost, toHost) {

    assert(keyspace, usage + 'Please provide a keyspace to migrate.');
    assert(fromHost, usage + 'Please provide a host to transfer data from.');
    assert(toHost, usage + 'Please provide a host to transfer data to.');

    console.time(timerLabel);

    keyspaceMigrationService.migrateKeyspace(keyspace, fromHost, toHost, (error) => {
        if (error) {
            console.log(error);
            process.exit(1);
        } else {
            console.timeEnd(timerLabel);
            process.exit(0);
        }
    });
}

if (!module.parent) {
    executeMigration(keyspace, fromHost, toHost);
}

module.exports = executeMigration;
