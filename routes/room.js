// router
const express = require('express');
const roomRouters = express.Router();
const authMiddleware = require('../Middleware/AuthMiddleware');

// Model
const roomModel = require('../model/room');
const roomImageModel = require('../model/roomImage');

const roomRouter = (app) => {

	roomRouters.use(authMiddleware.isAuth)

    roomRouters.get('/get-rooms/:id?', (req, res) => {
        const { isMatch = false, type = '' } = req.query;
        const { id } = req.params;

        switch (type) {
            case '':
                if (id) {
                    roomModel.get(id, (err, rows) => {
                        if (!err) {
                            res.send({
                                status: res.statusCode,
                                message: 'Get room success',
                                data: {
                                    room: rows[0]
                                }
                            })
                        } else {
                            res.send({
                                message: 'Can\'t get room'
                            })
                        }
                    })
                } else {
                    if (isMatch) {
                        roomModel.getNoMatch(req, (err, rows) => {
                            if (!err) {
                                res.send({
                                    status: res.statusCode,
                                    message: 'Get rooms success',
                                    data: {
                                        rooms: rows
                                    }
                                })
                            }
                        })
                    }
                    else {
                        roomModel.getAll(req, async (err, rows, fields) => {

                            if (!err) {
                                res.send({
                                    status: res.statusCode,
                                    message: 'Get rooms success',
                                    data: {
                                        rooms: rows
                                    }
                                })
                            }
                        })
                    }
                }

                break;
            case 'query':
                roomModel.getQuerry(req, (err, rows) => {
                    if (err) {
                        res.send({
                            message: err
                        })
                    } else {
                        res.send({
                            status: res.statusCode,
                            message: 'Get rooms success',
                            data: {
                                rooms: rows
                            }
                        })
                    }
                })
            default:
                break;
        }

    })

    roomRouters.post('/create', (req, res) => {
        roomModel.create(req, (err, rows) => {
            if (!err) {
                res.send({
                    status: res.statusCode,
                    message: 'Create rooms success',
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

    roomRouters.delete('/delete/:id', (req, res) => {
        roomModel.delete(req, (err, rows) => {
            if (!err) {
                res.send({
                    status: res.statusCode,
                    message: 'Delete room success',
                    data: {
                        status: 1
                    }
                })
            } else {
                res.send({
                    message: 'Can\'t delete room success'
                })
            }
        })
    })

    roomRouters.put('/update/:id', (req, res) => {
        roomModel.update(req, (err, rows) => {
            if (!err) {
                res.send({
                    status: res.statusCode,
                    message: 'Update room success',
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

    roomRouters.post('/delete-all', (req, res) => {
        roomModel.deleteAll(req, (err, rows) => {
            if (!err) {
                res.send({
                    status: res.statusCode,
                    message: 'Delete rooms success',
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

    roomRouters.get('/get-user-rent', (req, res) => {
        roomModel.getUserRent(req, (err, rows) => {
            if (!err) {
                res.send({
                    status: res.statusCode,
                    message: 'Get user rent success',
                    data: {
                        userRents: rows
                    }
                })
            }
        })
    })

    roomRouters.post('/uploadImage', (req, res) => {
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

    roomRouters.get('/get-images', (req, res) => {
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

    roomRouters.post('/delete-images', (req, res) => {
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

    app.use('/room', roomRouters);
}

module.exports = roomRouter;
