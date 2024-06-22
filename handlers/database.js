const mysql = require('mysql2');
const colors = require('colors');

require('dotenv').config()

const con = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.PORT
});

con.query(`CREATE DATABASE ${process.env.DATABASE}`, function(err, result) {
    if(err && err.code === "ER_DB_CREATE_EXISTS") return;

    console.log("[DB]".bold.green + ` Successfull created database : ${process.env.DATABASE}`.bold.white);
});

con.query(`CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, user_id VARCHAR(255), language VARCHAR(10))`, function(err, result) {
    if(err && err.code === "ER_TABLE_EXISTS_ERROR") return;

    console.log("[DB]".bold.green + ` Successfull created table : users`.bold.white);
})

con.query(`CREATE TABLE guilds (id INT AUTO_INCREMENT PRIMARY KEY, guild_id VARCHAR(255), language VARCHAR(10))`, function(err, result) {
    if(err && err.code === "ER_TABLE_EXISTS_ERROR") return;

    console.log("[DB]".bold.green + ` Successfull created table : guilds`.bold.white);
})