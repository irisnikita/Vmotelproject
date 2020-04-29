const connection = require('../database');

const Contract = {
    create: (req, callback) => {
        const { idRoom = '', idBlock, userRooms = [], idOwner = '', idSlave, startDate, endDate, circlePay, deposit = '', dayPay = 0, note = '' } = req.body;
        let query = 'INSERT INTO CONTRACTS (idRoom, idOwner, idSlave, startDate, endDate, circlePay, deposit, dayPay, note, idBlock) VALUES (?)'
        let query2 = 'INSERT INTO USER_ROOM (idUser, idRoom) VALUES ?'

        return connection.beginTransaction((err) => {
            if (err) {
                console.log(err)
                return connection.rollback(() => {
                    callback(err)
                })
            }

            connection.query(query, [[idRoom, idOwner, idSlave, startDate, endDate, circlePay, deposit, dayPay, note, idBlock]], (err, rows) => {
                if (err) {
                    return connection.rollback(() => {
                        callback(err)
                    })
                }

                connection.query(query2, [userRooms.map(userRoom => [userRoom.idUser, userRoom.idRoom])], (err, rows) => {
                    if (err) {
                        return connection.rollback(() => {
                            callback(err)
                        })
                    }
                    connection.commit(callback)
                })

            })
        })
    },
    createUserRoom: (req, callback) => {
        const { userRooms } = req.body;
        let query = 'INSERT INTO USER_ROOM (idUser, idRoom) VALUES ?'
        return connection.query(query, [userRooms.map(userRoom => [userRoom.idUser, userRoom.idRoom])], callback)
    },
    getAll: (req, callback) => {
        const { idBlock = '' } = req.query;
        let query = 'SELECT C.*, R.nameRoom, CU.fullName FROM CONTRACTS C INNER JOIN ROOMS R ON C.idRoom = R.id INNER JOIN CUSTOMERS CU ON C.idSlave = CU.id WHERE C.idBlock = ? ';
        return connection.query(query, [idBlock], callback);
    },
    delete: (req, callback) => {
        const { id = '' } = req.params;
        let query = 'DELETE FROM ROOMS WHERE id = ?'

        return connection.query(query, [id], callback)
    },
    deleteAll: (req, callback) => {
        const { roomsId } = req.body;

        let query = 'DELETE FROM ROOMS WHERE id IN (?)';

        return connection.query(query, [roomsId], callback)
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

module.exports = Contract;