const connection = require('../database');

const service = {
    create: (req, callback) => {
        const { services } = req.body;

        console.log(services)
        let query = 'INSERT INTO SERVICES (nameService, price, idUnit, description, idBlock) VALUES ?'
        return connection.query(query, [services.map(service => [service.nameService, service.price, service.idUnit, service.description, service.idBlock])], callback)
    },
    getAll: (req, callback) => {
        const { idBlock = '' } = req.query;
        let query = 'SELECT S.*, U.name nameUnit FROM SERVICES S INNER JOIN UNIT U ON S.idUnit = U.id WHERE idBlock = ? ';
        return connection.query(query, [idBlock], callback);
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

module.exports = service;