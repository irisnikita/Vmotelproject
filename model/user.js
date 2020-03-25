const connection = require('../database');
const bcrypt = require('bcrypt');

const User = {
    login: (req, callback) => {
        let query = 'SELECT * FROM USERS WHERE userName = ?'
        return connection.query(query,[req.body.userName],callback)
    },
    register: (req, callback) => {
        const {body = {}} = req;
        let query = 'INSERT INTO USERS (userName, pass, fullName, dateBirth, address, role) VALUES (?,?,?,?,?,?)'
        const hashPass = bcrypt.hashSync(body.pass, 10);

        return connection.query(query, [body.userName, hashPass, body.fullName, body.dateBirth, body.address, body.role], callback)
        
    },
    getAll: (callback) => {
        let query = 'SELECT * FROM USERS ';
        return connection.query(query, callback);
    }
}

module.exports = User;