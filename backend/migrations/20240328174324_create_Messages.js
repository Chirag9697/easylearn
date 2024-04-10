/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable('Messages', function (table) {
        table.increments('id');
        table.string('message').notNullable();
        table.string('senderid').notNullable();
        table.string('receiverid').notNullable();
        table.string('date').notNullable();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('Messages');
};
