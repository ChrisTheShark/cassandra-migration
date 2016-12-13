'use strict';
const DbFactory = require('../repository/database'),
    constants = require('../config/constants'),
    async = require('async');

module.exports.readKeyspaceTables = function(host, keyspace, callback) {
    let connection = DbFactory.createConnection([host], keyspace);
    connection.execute(constants.sql.read_tables_by_keyspace, [keyspace], {
        prepare: true
    }, (error, result) => {
        callback(error, result.rows.map((row) => {
            return row.columnfamily_name;
        }));
    });
}

module.exports.readTableColumns = function(host, keyspace, tables, callback) {
    let connection = DbFactory.createConnection([host], keyspace);
    async.map(tables, (table, cb) => {
        connection.execute(constants.sql.read_columns_by_keyspace_and_table, [keyspace, table], {
            prepare: true
        }, (error, result) => {
            if (error) return callback(error);

            let column_names = result.rows.map((row) => {
                return row.column_name;
            }).join(',');

            let queries = result.rows.map((row) => {
                return '?';
            }).join(',');

            cb(null, {
                table: table,
                columns: column_names,
                insert: `insert into ${table} (${column_names}) values (${queries})`
            });
        });
    }, (error, results) => {
        callback(error, results);
    });
}
