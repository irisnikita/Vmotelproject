const connection = require('../database');

const Room = {
    create: (req, callback) => {
        const { roomImages } = req.body;
        let query = 'INSERT INTO room_images (name, status, url, codeRoom) VALUES ?'
        return connection.query(query, [roomImages.map(roomImage => [roomImage.name, roomImage.status, roomImage.url, roomImage.codeRoom])], callback)
    },
    getAll: (codeRoom, callback) => {
        let query = 'SELECT * FROM room_images WHERE codeRoom = ? ';
        return connection.query(query, [codeRoom], callback);
    },
    delete: (req, callback) => {
        const { id = '' } = req.params;
        let query = 'DELETE FROM rooms WHERE id = ?'

        return connection.query(query, [id], callback)
    },
    deleteAll: (req, callback) => {
        const { codeRoom } = req.body;

        let query = 'DELETE FROM room_images WHERE codeRoom = ?';

        return connection.query(query, [codeRoom], callback)
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

module.exports = Room;