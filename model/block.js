const connection = require('../database');

const Block = {
    create: (req, callback) => {
        const { nameBlock = '', address = '', description = '', idOwner = 0 } = req.body;
        let query = 'INSERT INTO blocks (nameBlock, address, description, idOwner ) VALUES (?,?,?,?)'
        return connection.query(query, [nameBlock, address, description, idOwner], callback)
    },
    getAll: (req, callback) => {
        const { userId = '' } = req.query;
        let query = 'SELECT * FROM blocks WHERE idOwner = ? ';
        return connection.query(query, [userId], callback);
    },
    delete: (req, callback) => {
        const { id = '' } = req.params;
        let query = 'DELETE FROM blocks WHERE id = ?'

        return connection.query(query, [id], callback)
    },
    deleteAll: (req, callback) => {
        const { blocksId } = req.body;

        let query = 'DELETE FROM blocks WHERE id IN (?)';

        return connection.query(query, [blocksId], callback)
    },
    update: (req, callback) => {
        const { nameBlock, address, description } = req.body;
        const { id = '' } = req.params;
        let query = 'UPDATE blocks SET nameBlock = ?, address = ?, description = ? WHERE id = ?'

        return connection.query(query, [nameBlock, address, description, id], callback)
    },
    get: (id, callback) => {
        let query = 'SELECT * FROM USERS WHERE id = ?';
        return connection.query(query, [id], callback);
    }
}

module.exports = Block;