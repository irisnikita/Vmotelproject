// router
const express = require('express');
const customRouters = express.Router();
const authMiddleware = require('../Middleware/AuthMiddleware');
const connection = require('../database');
const { redisCustomer } = require('../Middleware/Redis');
const redis_client = require('../redis');
// Model
const customerModel = require('../model/customer');

const customRouter = (app) => {

    customRouters.use(authMiddleware.isAuth)

    customRouters.get('/get-customers', redisCustomer, (req, res) => {
        customerModel.getAll(req, async (err, rows) => {
            if (!err) {
                const getUserRoom = (rows, callback) => {
                    let UserRooms = [];
                    let pending = rows.length;

                    rows.forEach(row => {
                        let query = 'SELECT R.nameRoom FROM user_room UR INNER JOIN rooms R ON UR.idRoom = R.id WHERE idUser = ? ';

                        connection.query(query, [row.id], (err, userRoom) => {
                            if (!err) {
                                UserRooms.push({
                                    ...row,
                                    rooms: JSON.parse(JSON.stringify(userRoom))
                                })
                                if (0 === --pending) {
                                    callback(UserRooms)
                                }
                            }
                        })
                    })
                }

                if (rows.length > 0) {
                    getUserRoom(JSON.parse(JSON.stringify(rows)), (userRooms) => {
                        const redis_client = require('../redis');

                        redis_client.setex(`customers:${req.query.userId}`, 3600, JSON.stringify(userRooms))

                        res.send({
                            status: res.statusCode,
                            message: 'Get customers success',
                            data: {
                                customers: userRooms
                            }
                        })
                    })
                } else {
                    res.send({
                        status: res.statusCode,
                        message: 'Get customers success',
                        data: {
                            customers: []
                        }
                    })
                }

            } else {
                res.send({
                    message: 'Can\'t get customers'
                })
            }
        })
    })

    customRouters.post('/create', (req, res) => {
        redis_client.del(`customers:${req.query.userId}`)

        customerModel.create(req, (err, rows) => {
            if (!err) {
                res.send({
                    status: res.statusCode,
                    message: 'Create customer success',
                    data: {
                        status: 1
                    }
                })
            } else {
                res.send({
                    message: err
                })
            }
        })
    })

    customRouters.delete('/delete/:id', (req, res) => {
        redis_client.del(`customers:${req.query.userId}`)

        customerModel.delete(req, (err, rows) => {
            if (!err) {
                res.send({
                    status: res.statusCode,
                    message: 'Delete customer success',
                    data: {
                        status: 1
                    }
                })
            } else {
                res.send({
                    message: err
                })
            }
        })
    })

    customRouters.put('/update/:id', (req, res) => {
        redis_client.del(`customers:${req.query.userId}`)

        customerModel.update(req, (err, rows) => {
            if (!err) {
                res.send({
                    status: res.statusCode,
                    message: 'Update customer success',
                    data: {
                        status: 1
                    }
                })
            } else {
                res.send({
                    message: err
                })
            }
        })
    })

    customRouters.post('/delete-all', (req, res) => {
        redis_client.del(`customers:${req.query.userId}`)

        customerModel.deleteAll(req, (err, rows) => {
            if (!err) {
                res.send({
                    status: res.statusCode,
                    message: 'Delete customer success',
                    data: {
                        status: 1
                    }
                })
            } else {
                res.send({
                    message: err
                })
            }
        })
    })

    app.use('/customer', customRouters);
}

module.exports = customRouter;