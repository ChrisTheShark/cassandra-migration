'use strict';
const tableMetadataService = require('./tableMetadataService'),
    tableLoadService = require('./tableLoadService'),
    async = require('async');

/**
 * Load a keyspace from one Cassandra host to another. This utility assumes
 * keyspace exists on the to and from Cassandra instances.
 *
 * @param keyspace the keyspace to migrate from one host to another.
 * @param fromHost the host to migrate data from.
 * @param toHost the host to migrate data to.
 * @param callback the callback to invoke upon success or failure.
 */
module.exports.migrateKeyspace = function(keyspace, fromHost, toHost, callback) {
    async.waterfall([
        function(cb) {
            /*
             * Collect a list of tables to migrate.
             */
            tableMetadataService.readKeyspaceTables(fromHost,
                keyspace, cb);
        },
        function(tables, cb) {
            /*
             * Create a mapping from table name to insert statement.
             */
            tableMetadataService.readTableColumns(fromHost,
                keyspace, tables, cb);
        },
        function(tableMapping, cb) {
            /*
             * Perform the table by table migration.
             */
            tableLoadService.loadTables(fromHost, toHost, keyspace,
                tableMapping, cb);
        }
    ], (error) => {
        return callback(error);
    });
}
