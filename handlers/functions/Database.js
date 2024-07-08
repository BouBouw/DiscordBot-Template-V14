const mysql = require('mysql2');

require('dotenv').config()

const sql = () => {
    const con = mysql.createConnection({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        port: process.env.PORT
    });

    return con;
}

const db = {
    sql,
}

module.exports = db;