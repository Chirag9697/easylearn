/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable('attendancecheck', function (table) {
        table.increments('id');
        table.string('teacherid').notNullable();
        table.string('classid').notNullable();
        table.string('date').notNullable();
        // table.string('status').notNullable();
        // table.string('teacherid').notNullable();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('attendancecheck');
};
