'use strict';
const DbFactory = require('../repository/database'),
    async = require('async');

module.exports.loadTables = function(fromHost, toHost, keyspace,
    tableMappings, callback) {
    let fromConnection = DbFactory.createConnection([fromHost], keyspace);
    let toConnection = DbFactory.createConnection([toHost], keyspace);

    async.eachSeries(tableMappings, (mapping, cb) => {
        console.log('Loading mapping: ', mapping);
        fromConnection.stream(`select ${mapping.columns} from ${mapping.table}`, [])
            .on('readable', function() {
                let row;
                while (row = this.read()) {
                    let values = Object.keys(row).map((column) => {
                        return row[column];
                    });

                    toConnection.execute(mapping.insert, values, {
                        prepare: true
                    }, function(error, result) {
                        if (error) return cb(error);
                    });
                }
            })
            .on('end', function() {
                console.log('Table ' + mapping.table + ' successfully migrated.')
                return cb(null);
            })
            .on('error', function(error) {
                return cb(error);
            });
    }, (error) => {
        callback(error);
    });
}
