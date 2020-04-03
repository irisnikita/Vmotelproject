// router
const express = require('express');
const roomRouters = express.Router();
const authMiddleware = require('../Middleware/AuthMiddleware');

// Model
const roomModel = require('../model/room');

const roomRouter = (app) => {

    roomRouters.use(authMiddleware.isAuth)

    roomRouters.get('/get-rooms', (req, res) => {
        roomModel.getAll(req, (err, rows) => {
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


    app.use('/room', roomRouters);
}

module.exports = roomRouter;