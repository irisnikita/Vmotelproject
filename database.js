const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'remotemysql.com',
    port: '3306',
    user: 'tuRabkVz2Q',
    password: '1hAeEJOUHp',
    database: 'tuRabkVz2Q'
})

module.exports = connection;
