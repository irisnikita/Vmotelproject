const connection = require("../database");

const Contract = {
    create: (req, callback) => {
        const {
            idRoom = "",
            idBlock,
            userRooms = [],
            idOwner = "",
            idSlave,
            startDate,
            endDate,
            circlePay,
            deposit = "",
            dayPay = 0,
            note = "",
        } = req.body;
        let query =
            "INSERT INTO contracts (idRoom, idOwner, idSlave, startDate, endDate, circlePay, deposit, dayPay, note, idBlock) VALUES (?)";
        let query2 = "INSERT INTO user_room (idUser, idRoom) VALUES ?";

        return connection.beginTransaction((err) => {
            if (err) {
                console.log(err);
                return connection.rollback(() => {
                    callback(err);
                });
            }

            connection.query(
                query,
                [
                    [
                        idRoom,
                        idOwner,
                        idSlave,
                        startDate,
                        endDate,
                        circlePay,
                        deposit,
                        dayPay,
                        note,
                        idBlock,
                    ],
                ],
                (err, rows) => {
                    if (err) {
                        return connection.rollback(() => {
                            callback(err);
                        });
                    }

                    connection.query(
                        query2,
                        [
                            userRooms.map((userRoom) => [
                                userRoom.idUser,
                                userRoom.idRoom,
                            ]),
                        ],
                        (err, rows) => {
                            if (err) {
                                return connection.rollback(() => {
                                    callback(err);
                                });
                            }
                            connection.commit(callback);
                        }
                    );
                }
            );
        });
    },
    createUserRoom: (req, callback) => {
        const { userRooms } = req.body;
        let query = "INSERT INTO user_room (idUser, idRoom) VALUES ?";
        return connection.query(
            query,
            [userRooms.map((userRoom) => [userRoom.idUser, userRoom.idRoom])],
            callback
        );
    },
    getAll: (req, callback) => {
        const { idBlock = "" } = req.query;
        let query =
            "SELECT C.*, R.nameRoom, CU.fullName FROM contracts C INNER JOIN rooms R ON C.idRoom = R.id INNER JOIN customers CU ON C.idSlave = CU.id WHERE C.idBlock = ? ";
        return connection.query(query, [idBlock], callback);
    },
    delete: (req, callback) => {
        const { id = "" } = req.params;
        let query = "DELETE FROM contracts WHERE id = ?";

        return connection.query(query, [id], callback);
    },
    deleteAll: (req, callback) => {
        const { contractsId } = req.body;

        let query = "DELETE FROM contracts WHERE id IN (?)";

        return connection.query(query, [contractsId], callback);
    },
    update: (req, callback) => {
        const {
            userRooms = [],
            idRoom,
            idSlave,
            startDate,
            endDate,
            circlePay,
            deposit = "",
            dayPay = 0,
            note = "",
        } = req.body;
        const { id = "" } = req.params;
        let query =
            "UPDATE contracts SET idSlave = ?, startDate = ?, endDate = ?, circlePay = ?, deposit = ?, dayPay = ?, note = ? WHERE id = ?";
        let query2 = 'DELETE FROM user_room WHERE idRoom = ?';
        let query3 = 'INSERT INTO user_room (idUser, idRoom) VALUES ?'

        return connection.beginTransaction((err) => {
            if (err) {
                console.log(err);
                return connection.rollback(() => {
                    callback(err);
                });
            }

            connection.query(query, [idSlave, startDate, endDate, circlePay, deposit, dayPay, note, id], (err, rows) => {
                if (err) {
                    return connection.rollback(() => {
                        callback(err);
                    });
                }

                connection.query(query2, [idRoom], (err, rows) => {
                    if (err) {
                        return connection.rollback(() => {
                            callback(err);
                        });
                    }

                    connection.query(query3, [userRooms.map(userRoom => [userRoom.idUser, userRoom.idRoom,])], (err, rows) => {
                        if (err) {
                            return connection.rollback(() => {
                                callback(err);
                            });
                        }

                        connection.commit(callback);
                    })
                })
            })
        })
    },
    get: (id, callback) => {
        let query = "SELECT * FROM USERS WHERE id = ?";
        return connection.query(query, [id], callback);
    },
};

module.exports = Contract;
