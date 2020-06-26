const connection = require('../database');

const Room = {
    create: (req, callback) => {
        const { idBlock = '', nameRoom = '', maxPeople, floor, square, price, description = '', status = 0, codeRoom = '' } = req.body;
        let query = 'INSERT INTO rooms (idBlock, nameRoom, maxPeople, floor, square, price, description, status, codeRoom) VALUES (?,?,?,?,?,?,?,?,?)'
        return connection.query(query, [idBlock, nameRoom, maxPeople, floor, square, price, description, status, codeRoom], callback)
    },
    getAll: (req, callback) => {
        const { idBlock = '' } = req.query;
        let query = 'SELECT * FROM rooms WHERE idBlock = ? ';
        return connection.query(query, [idBlock], callback);
    },
    getUserRent: (req, callback) => {
        const { idRoom = '' } = req.query;
        let query = 'SELECT C.fullName FROM user_room UR INNER JOIN customers C ON UR.idUser = C.id  WHERE UR.idRoom = ?'
        return connection.query(query, [idRoom], callback)
    },
    getQuerry: (req, callback) => {
        const { idBlock, userId, status } = req.query;

        let query = 'SELECT R.*, B.nameBlock, C.startDate FROM rooms R INNER JOIN blocks B ON R.idBlock = B.id LEFT JOIN contracts C ON R.id = C.idRoom WHERE R.idBlock = ? ';
        let query2 = `SELECT R.*, B.nameBlock, C.startDate FROM rooms R INNER JOIN blocks B ON R.idBlock = B.id LEFT JOIN contracts C ON R.id = C.idRoom WHERE status = ? AND R.idBlock = ?`;
        let query4 = `SELECT R.*, B.nameBlock, C.startDate FROM rooms R INNER JOIN blocks B ON R.idBlock = B.id LEFT JOIN contracts C ON R.id = C.idRoom WHERE B.idOwner = ?`
        let query3 = `SELECT R.*, B.nameBlock, C.startDate FROM rooms R INNER JOIN blocks B ON R.idBlock = B.id LEFT JOIN contracts C ON R.id = C.idRoom WHERE B.idOwner = ? AND R.status = ?`;

        if (+idBlock === -1 && +status === -1) {
            return connection.query(query4, [userId], callback)
        } else if (+idBlock === -1 && +status !== -1) {
            return connection.query(query3, [userId, status], callback)
        } else {
            if (+status === -1) {
                return connection.query(query, [idBlock], callback)
            } else {
                return connection.query(query2, [status, idBlock], callback)
            }
        }

    },
    getUserRoom: (id) => {
        let query = 'SELECT R.nameRoom FROM user_room UR INNER JOIN rooms R ON UR.idRoom = R.id WHERE idUser = ? ';
        let nameRooms = [];

        connection.query(query, [id], (err, rows) => {
            if (!err) {
                nameRooms = JSON.parse(JSON.stringify(rows))
                return JSON.parse(JSON.stringify(rows))
            }
        })

        return nameRooms;
    },
    getNoMatch: (req, callback) => {
        const { idBlock = '' } = req.query;
        let query = 'SELECT R.* FROM rooms R LEFT JOIN user_room UR ON R.id = UR.idRoom WHERE UR.idRoom IS NULL AND idBlock = ?'
        return connection.query(query, [idBlock], callback)
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
        let query = 'SELECT * FROM rooms WHERE id = ?';
        return connection.query(query, [id], callback);
    }
}

module.exports = Room;