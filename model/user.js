const connection = require('../database');
const bcrypt = require('bcrypt');

const User = {
    login: (req, callback) => {
        let query = 'SELECT * FROM USERS WHERE userName = ?'
        return connection.query(query, [req.body.userName], callback)
    },
    register: (req, callback) => {
        console.log(req.body);
        const { body = {} } = req;
        const { fullName, sex, userName, email, province, address, pass, role } = body;

        let query = 'INSERT INTO USERS (fullName, sex, userName, email, province, address, pass, role) VALUES (?,?,?,?,?,?,?,?)'
        const hashPass = bcrypt.hashSync(pass, 10);

        return connection.query(query, [fullName, sex, userName, email, province, address, hashPass, role], callback)

    },
    getAll: (callback) => {
        let query = 'SELECT * FROM USERS ';
        return connection.query(query, callback);
    }
}

module.exports = User;