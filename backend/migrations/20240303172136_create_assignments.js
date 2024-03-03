/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable('assignments', function (table) {
        table.increments('id');
        table.string('qp').notNullable();
        table.string('ans').notNullable();
        table.string('classid').notNullable();
        table.string('title').notNullable();
        table.string('deadline').notNullable();
        // table.string('status').notNullable();
        // table.string('teacherid').notNullable();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('assignments');
};
