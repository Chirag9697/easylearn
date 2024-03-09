/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable('Quizes', function (table) {
        table.increments('id');
        table.string('classid').notNullable();
        table.string('title').notNullable();
        table.string('Marks').notNullable();
        table.string('time').notNullable();
        table.string('duration').notNullable();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('Quizes');
};
