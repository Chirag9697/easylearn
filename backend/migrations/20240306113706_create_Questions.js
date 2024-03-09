/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable('Questions', function (table) {
        table.increments('id');
        table.string('questiontitle').notNullable();
        table.string('optiona').notNullable();
        table.string('optionb').notNullable();
        table.string('optionc').notNullable();
        table.string('optiond').notNullable();
        table.string('answer').notNullable();
        table.string('quizid').notNullable();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('Questions');
};
