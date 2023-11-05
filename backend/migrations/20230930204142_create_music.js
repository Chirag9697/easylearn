/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable('music', function (table) {
        table.increments('id');
        table.string('nameofmusic').notNullable()
        table.string('videoid').notNullable()
        table.string('url').notNullable()
        table.string('duration').notNullable()
        table.integer('playlistid').references('playlists.id');
        // table.string('password',255).notNullable();
        // table.jsonb('roles');
        // table.string('last_name', 255).notNullable();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('playlists');
  
};
