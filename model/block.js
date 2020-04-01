const connection = require('../database');

const Block = {
    create: (req, callback) => {
        const { nameBlock = '', address = '', descreption = '', idOwner = 0 } = req.body;
        let query = 'INSERT INTO BLOCKS (nameBlock, address, descreption, idOwner ) VALUES (?,?,?,?)'
        return connection.query(query, [nameBlock, address, descreption, idOwner], callback)
    },
    getAll: (req, callback) => {
        const { userId = '' } = req.query;
        let query = 'SELECT * FROM BLOCKS WHERE idOwner = ? ';
        return connection.query(query, [userId], callback);
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

module.exports = Block;