/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable('Marks', function (table) {
        table.increments('id');
        table.string('userid').notNullable();
        table.string('title').notNullable();
        table.string('marks').notNullable();
        table.string('sourceid').notNullable();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('Marks');
};
