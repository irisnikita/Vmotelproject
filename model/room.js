const connection = require('../database');

const Room = {
    create: (req, callback) => {
        const { idBlock = '', nameRoom = '', maxPeople, floor, square, price, descreption = '', status = 0 } = req.body;
        let query = 'INSERT INTO ROOMS (idBlock, nameRoom, maxPeople, floor, square, price, descreption, status) VALUES (?,?,?,?,?,?,?,?)'
        return connection.query(query, [idBlock, nameRoom, maxPeople, floor, square, price, descreption, status], callback)
    },
    getAll: (req, callback) => {
        const { idBlock = '' } = req.query;
        let query = 'SELECT * FROM ROOMS WHERE idBlock = ? ';
        return connection.query(query, [idBlock], callback);
    },
    delete: (req, callback) => {
        const { id = '' } = req.params;
        let query = 'DELETE FROM BLOCKS WHERE id = ?'

        return connection.query(query, [id], callback)
    },
    deleteAll: (req, callback) => {
        const { blocksId } = req.body;

        console.log(blocksId)
        let query = 'DELETE FROM BLOCKS WHERE id IN (?)';

        return connection.query(query, [blocksId], callback)
    },
    update: (req, callback) => {
        const { nameBlock, address, descreption } = req.body;
        const { id = '' } = req.params;
        let query = 'UPDATE BLOCKS SET nameBlock = ?, address = ?, descreption = ? WHERE id = ?'

        return connection.query(query, [nameBlock, address, descreption, id], callback)
    },
    get: (id, callback) => {
        let query = 'SELECT * FROM USERS WHERE id = ?';
        return connection.query(query, [id], callback);
    }
}

module.exports = Room;