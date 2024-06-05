const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'paleo_league',
    connectionLimit: 5
});

module.exports = pool;