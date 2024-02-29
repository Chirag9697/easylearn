/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable('Materials', function (table) {
        table.increments('id');
        table.string('classid').notNullable();
        table.string('title').notNullable();
        table.string('filename').notNullable();
        table.string('teacherid').notNullable();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('Materials');
};
