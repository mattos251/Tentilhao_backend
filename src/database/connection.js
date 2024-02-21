// const mysql = require('mysql2/promise');

// require('dotenv').config();

// const connection = mysql.createPool({
//     host: process.env.MYSQL_HOST,
//     user: process.env.MYSQL_USER,
//     password: process.env.MYSQL_PASSWORD,
//     database: process.env.MYSQL_DATABASE
// })

// module.exports = connection;

const { Pool } = require('pg');

require('dotenv').config();

const connection = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DATABASE,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
    connectionString: process.env.POSTGRES_URL ,
});

module.exports = connection;