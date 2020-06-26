const connection = require('../database');
const bcrypt = require('bcrypt');

const User = {
    login: (req, callback) => {
        let query = 'SELECT * FROM users WHERE userName = ?'
        return connection.query(query, [req.body.userName], callback)
    },
    register: (req, callback) => {
        const { body = {} } = req;
        const { fullName, sex, userName, email, province, address, pass, role, phoneNumber } = body;

        let query = 'INSERT INTO users (fullName, sex, userName, email, province, address, pass, role, phoneNumber) VALUES (?,?,?,?,?,?,?,?,?)'
        const hashPass = bcrypt.hashSync(pass, 10);

        return connection.query(query, [fullName, sex, userName, email, province, address, hashPass, role, phoneNumber], callback)

    },
    getAll: (callback) => {
        let query = 'SELECT * FROM users ';
        return connection.query(query, callback);
    },
    get: (id, callback) => {
        let query = 'SELECT * FROM users WHERE id = ?';
        return connection.query(query, [id], callback);
    }
}

module.exports = User;