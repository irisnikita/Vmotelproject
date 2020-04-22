const connection = require('../database');

const Room = {
    create: (req, callback) => {
        const { roomImages } = req.body;
        let query = 'INSERT INTO ROOM_IMAGES (name, status, url, codeRoom) VALUES ?'
        return connection.query(query, [roomImages.map(roomImage => [roomImage.name, roomImage.status, roomImage.url, roomImage.codeRoom])], callback)
    },
    getAll: (codeRoom, callback) => {
        let query = 'SELECT * FROM ROOM_IMAGES WHERE codeRoom = ? ';
        return connection.query(query, [codeRoom], callback);
    },
    delete: (req, callback) => {
        const { id = '' } = req.params;
        let query = 'DELETE FROM ROOMS WHERE id = ?'

        return connection.query(query, [id], callback)
    },
    deleteAll: (req, callback) => {
        const { codeRoom } = req.body;

        let query = 'DELETE FROM ROOM_IMAGES WHERE codeRoom = ?';

        return connection.query(query, [codeRoom], callback)
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