/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable('classes', function (table) {
        table.increments('id');
        table.string('classname').notNullable();
        table.string('studentid').notNullable();
        table.string('teacherid').notNullable();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('classes');
  
};
