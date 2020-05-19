const connection = require('../database');

const unit = {
    create: (req, callback) => {
        const { services } = req.body;

        let query = 'INSERT INTO SERVICES (nameService, price, idUnit, description, idBlock) VALUES ?'
        return connection.query(query, [services.map(service => [service.nameService, service.price, service.idUnit, service.description, service.idBlock])], callback)
    },
    getAll: (req, callback) => {
        let query = 'SELECT * FROM UNITS ';
        return connection.query(query, callback);
    },
    delete: (req, callback) => {
        const { id = '' } = req.params;
        let query = 'DELETE FROM SERVICES WHERE id = ?'

        return connection.query(query, [id], callback)
    },
    deleteAll: (req, callback) => {
        const { servicesId } = req.body;

        let query = 'DELETE FROM SERVICES WHERE id IN (?)';

        return connection.query(query, [servicesId], callback)
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

module.exports = unit;