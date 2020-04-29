const connection = require('../database');

const Room = {
    create: (req, callback) => {
        const { idBlock = '', nameRoom = '', maxPeople, floor, square, price, description = '', status = 0, codeRoom = '' } = req.body;
        let query = 'INSERT INTO ROOMS (idBlock, nameRoom, maxPeople, floor, square, price, description, status, codeRoom) VALUES (?,?,?,?,?,?,?,?,?)'
        return connection.query(query, [idBlock, nameRoom, maxPeople, floor, square, price, description, status, codeRoom], callback)
    },
    getAll: (req, callback) => {
        const { idBlock = '' } = req.query;
        let query = 'SELECT * FROM ROOMS WHERE idBlock = ? ';
        return connection.query(query, [idBlock], callback);
    },
    getNoMatch: (req, callback) => {
        const { idBlock = '' } = req.query;
        let query = 'SELECT R.* FROM ROOMS R LEFT JOIN USER_ROOM UR ON R.id = UR.idRoom WHERE UR.idRoom IS NULL AND idBlock = ?'
        return connection.query(query, [idBlock], callback)
    },
    delete: (req, callback) => {
        const { id = '' } = req.params;
        let query = 'DELETE FROM ROOMS WHERE id = ?'

        return connection.query(query, [id], callback)
    },
    deleteAll: (req, callback) => {
        const { roomsId } = req.body;

        let query = 'DELETE FROM ROOMS WHERE id IN (?)';

        return connection.query(query, [roomsId], callback)
    },
    update: (req, callback) => {
        const { nameRoom, floor, square, price, description, maxPeople } = req.body;
        const { id = '' } = req.params;
        let query = 'UPDATE ROOMS SET nameRoom = ?, floor = ?, square = ?, price = ?, description = ?, maxPeople = ? WHERE id = ?'

        return connection.query(query, [nameRoom, floor, square, price, description, maxPeople, id], callback)
    },
    get: (id, callback) => {
        let query = 'SELECT * FROM USERS WHERE id = ?';
        return connection.query(query, [id], callback);
    }
}

module.exports = Room;