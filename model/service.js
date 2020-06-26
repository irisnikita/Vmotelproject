const connection = require('../database');

const service = {
    create: (req, callback) => {
        const { services } = req.body;
        let query = 'INSERT INTO services (nameService, price, idUnit, description, idBlock) VALUES ?'
        return connection.query(query, [services.map(service => [service.nameService, service.price, service.idUnit, service.description, service.idBlock])], callback)
    },
    getAll: (req, callback) => {
        const { idBlock = '' } = req.query;
        let query = 'SELECT S.*, U.name nameUnit FROM services S INNER JOIN units U ON S.idUnit = U.id WHERE idBlock = ? ';
        return connection.query(query, [idBlock], callback);
    },
    delete: (req, callback) => {
        const { id = '' } = req.params;
        let query = 'DELETE FROM services WHERE id = ?'

        return connection.query(query, [id], callback)
    },
    deleteAll: (req, callback) => {
        const { servicesId } = req.body;

        let query = 'DELETE FROM services WHERE id IN (?)';

        return connection.query(query, [servicesId], callback)
    },
    update: (req, callback) => {
        const { price, idUnit, description } = req.body;
        const { id = '' } = req.params;
        let query = 'UPDATE services SET price = ?, idUnit = ?, description = ? WHERE id = ?'

        return connection.query(query, [price, idUnit, description, id], callback)
    },
    get: (id, callback) => {
        let query = 'SELECT * FROM users WHERE id = ?';
        return connection.query(query, [id], callback);
    }
}

module.exports = service;