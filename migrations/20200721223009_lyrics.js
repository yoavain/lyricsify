exports.up = knex => {
    return knex.schema.createTableIfNotExists('lyrics', table => {
        table.string('artist').notNullable()
        table.string('track').notNullable()
        table.string('lyrics', 64 * 1024)
        table.primary(["artist", "track"])
    });
};

exports.down = knex => {
    return knex.schema.dropTable('lyrics');
};
