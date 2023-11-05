// import dotenv from 'dotenv';
const { Knex } = require("knex");
// dotenv.config();
// const dotenv=require('dotenv');
// dotenv.config();
module.exports = {
    development: {
        client: 'sqlite3',
        connection: {
            filename: "example.db"
        },
        seeds: {
            directory: './seeds'
        },
        useNullAsDefault: true,
        debug: true,
    },
};
//# sourceMappingURL=knexfile.js.map