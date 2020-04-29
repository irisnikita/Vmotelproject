const mysql = require('mysql');

const connection = mysql.createConnection({
    host: '104.197.241.11',
    user: 'root',
    password: 'tjmwjm824594',
    database: 'ROOM_SCHEMA'
})

module.exports = connection;