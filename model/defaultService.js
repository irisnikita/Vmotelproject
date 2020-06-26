const connection = require('../database');

const service = {
    create: (req, callback) => {
        const { idBlock = '', nameRoom = '', maxPeople, floor, square, price, description = '', status = 0 } = req.body;
        let query = 'INSERT INTO rooms (idBlock, nameRoom, maxPeople, floor, square, price, description, status) VALUES (?,?,?,?,?,?,?,?)'
        return connection.query(query, [idBlock, nameRoom, maxPeople, floor, square, price, description, status], callback)
    },
    getAll: (req, callback) => {
        // const { idBlock = '' } = req.query;
        let query = 'SELECT DS.*,U.name FROM default_services as DS INNER JOIN units as U on DS.idUnit = U.id';
        return connection.query(query, callback);
    },
    delete: (req, callback) => {
        const { id = '' } = req.params;
        let query = 'DELETE FROM rooms WHERE id = ?'

        return connection.query(query, [id], callback)
    },
    deleteAll: (req, callback) => {
        const { roomsId } = req.body;

        let query = 'DELETE FROM rooms WHERE id IN (?)';

        return connection.query(query, [roomsId], callback)
    },
    update: (req, callback) => {
        const { nameRoom, floor, square, price, description, maxPeople } = req.body;
        const { id = '' } = req.params;
        let query = 'UPDATE rooms SET nameRoom = ?, floor = ?, square = ?, price = ?, description = ?, maxPeople = ? WHERE id = ?'

        return connection.query(query, [nameRoom, floor, square, price, description, maxPeople, id], callback)
    },
    get: (id, callback) => {
        let query = 'SELECT * FROM users WHERE id = ?';
        return connection.query(query, [id], callback);
    }
}

module.exports = service;