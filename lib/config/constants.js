module.exports = {
    sql: {
        read_tables_by_keyspace: "select columnfamily_name from " +
            "system.schema_columnfamilies where keyspace_name = ?",
        read_columns_by_keyspace_and_table: "select column_name from" +
            " system.schema_columns where keyspace_name = ? and " +
            "columnfamily_name = ?"
    }
}
