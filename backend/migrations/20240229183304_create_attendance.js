/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable('attendance', function (table) {
        table.increments('id');
        table.string('studentid').notNullable();
        table.string('classid').notNullable();
        table.string('date').notNullable();
        table.string('status').notNullable();
        // table.string('teacherid').notNullable();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('attendance');
};
