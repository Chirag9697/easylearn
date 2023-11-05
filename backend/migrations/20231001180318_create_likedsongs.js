/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable('likedsongs', function (table) {
        table.increments('id');
        // table.string('nameofmusic').notNullable()
        // table.string('videoid').notNullable()
        table.integer('musicid').references('music.id');
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
    return knex.schema.dropTable('likedsongs');
};
