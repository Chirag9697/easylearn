/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable('playlists', function (table) {
        table.increments('id');
        table.string('nameofplaylist').notNullable()
        table.integer('userid').references('users.id');
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
