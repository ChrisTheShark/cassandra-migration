## Synopsis

This is a simple utility to transfer data from one Cassandra host to another. The utility assumes the keyspace to migrate exists on both hosts.

## Code Example

This utilty can be invoked using the following format:

`npm start <KEYSPACE> <FROM_HOST> <TO_HOST>`

## Motivation

There is no reason to migrate data between two nodes in the same cluster. There was a need to transfer data from one host on one cluster to another host in a different cluster to support business validation of the data within the from node.
