require('dotenv').config();
// Update with your config settings.

module.exports = {

    development: {
        client: 'pg',
        connection: 'postgres://localhost/ccManagerUser'

    },


    production: {
        client: 'postgresql',
        connection: process.env.DATABASE_URL + '?ssl=true',
    },

};
