// router
const express = require('express');
const contractRouters = express.Router();
const authMiddleware = require('../Middleware/AuthMiddleware');
const connection = require('../database');
const { redisContract } = require('../Middleware/Redis')
const redis_client = require('../redis');

// Model
const contractModel = require('../model/contract');
const roomImageModel = require('../model/roomImage');


const contractRouter = (app) => {
    contractRouters.use(authMiddleware.isAuth)

    contractRouters.get('/get-contracts', redisContract, (req, res) => {
        contractModel.getAll(req, (err, rows) => {
            if (!err) {
                const getUser = (contracts, callback) => {
                    let Users = [];
                    let pendding = contracts.length;

                    contracts.forEach((contract) => {
                        let query = 'SELECT idUser FROM user_room WHERE idRoom = ?';
                        connection.query(query, [contract.idRoom], (err, idUsers) => {
                            const newIdUsers = JSON.parse(JSON.stringify(idUsers)).map(idUser => (+`${idUser.idUser}`))
                            if (!err) {
                                Users.push({
                                    ...contract,
                                    idUsers: newIdUsers
                                })
                                if (0 === --pendding) {
                                    callback(Users)
                                }
                            }
                        })
                    })


                }

                if (rows.length > 0) {
                    getUser(JSON.parse(JSON.stringify(rows)), (Users) => {
                        if (Users) {
                            const redis_client = require('../redis');
                            redis_client.setex(`contracts:${req.query.idBlock}`, 3600, JSON.stringify(Users))
                            res.send({
                                status: res.statusCode,
                                message: 'Get contracts success',
                                data: {
                                    contracts: Users
                                }
                            })
                        } else {
                            res.send({
                                message: 'Can\'t get contracts'
                            })
                        }
                    })
                } else {
                    res.send({
                        status: res.statusCode,
                        message: 'Get contracts success',
                        data: {
                            contracts: []
                        }
                    })
                }
            }
        })
    })

    contractRouters.post('/create', (req, res) => {
        redis_client.del(`contracts:${req.body.idBlock}`)
        redis_client.del(`customers:${req.query.userId}`)

        contractModel.create(req, (err, rows) => {
            if (!err) {
                res.send({
                    status: res.statusCode,
                    message: 'Create contract success',
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

    contractRouters.post('/create-user-room', (req, res) => {
        redis_client.del(`customers:${req.query.userId}`)
        contractModel.create(req, (err, rows) => {
            if (!err) {
                res.send({
                    status: res.statusCode,
                    message: 'Create userRoom success',
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

    contractRouters.delete('/delete/:id', (req, res) => {
        redis_client.del(`contracts:${req.query.idBlock}`)
        redis_client.del(`customers:${req.query.userId}`)

        contractModel.delete(req, (err, rows) => {
            if (!err) {
                res.send({
                    status: res.statusCode,
                    message: 'Delete contract success',
                    data: {
                        status: 1
                    }
                })
            } else {
                res.send({
                    message: 'Can\'t delete contract'
                })
            }
        })
    })

    contractRouters.put('/update/:id', (req, res) => {
        redis_client.del(`contracts:${req.body.idBlock}`)
        redis_client.del(`customers:${req.query.userId}`)

        contractModel.update(req, (err, rows) => {
            if (!err) {
                res.send({
                    status: res.statusCode,
                    message: 'Update contract success',
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

    contractRouters.post('/delete-all', (req, res) => {
        redis_client.del(`contracts:${req.body.idBlock}`)
        redis_client.del(`customers:${req.query.userId}`)

        contractModel.deleteAll(req, (err, rows) => {
            if (!err) {
                res.send({
                    status: res.statusCode,
                    message: 'Delete contracts success',
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

    contractRouters.post('/uploadImage', (req, res) => {
        roomImageModel.create(req, (err, rows, fields) => {
            if (!err) {
                res.send({
                    status: res.statusCode,
                    message: 'Upload images success',
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

    contractRouters.get('/get-images', (req, res) => {
        roomImageModel.getAll(req.query.codeRoom, (err, rows, fields) => {
            if (!err) {
                res.send({
                    status: res.statusCode,
                    message: 'get images success',
                    data: {
                        images: rows
                    }
                })
            } else {
                res.send({
                    message: err
                })
            }
        })
    })

    contractRouters.post('/delete-images', (req, res) => {
        roomImageModel.deleteAll(req, (err, rows, fields) => {
            if (!err) {
                res.send({
                    status: res.statusCode,
                    message: 'Delete images success',
                    data: {
                        images: rows
                    }
                })
            } else {
                res.send({
                    message: err
                })
            }
        })
    })

    app.use('/contract', contractRouters);
}

module.exports = contractRouter;