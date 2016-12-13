'use strict';
const cassandra = require('cassandra-driver');

module.exports.createConnection = function(hosts, keyspace) {
    return new cassandra.Client({
        contactPoints: hosts,
        keyspace: keyspace
    });
}
