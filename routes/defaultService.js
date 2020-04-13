// router
const express = require('express');
const defaultServiceRouters = express.Router();
const authMiddleware = require('../Middleware/AuthMiddleware');

// Model
const defaultServiceModel = require('../model/defaultService');

const defaultServiceRouter = (app) => {

    defaultServiceRouters.use(authMiddleware.isAuth)

    defaultServiceRouters.get('/get-default-services', (req, res) => {
        defaultServiceModel.getAll(req, (err, rows) => {
            if (!err) {
                res.send({
                    status: res.statusCode,
                    message: 'Get services success',
                    data: {
                        defaultServices: rows
                    }
                })
            }
        })
    })

    defaultServiceRouters.post('/create', (req, res) => {
        defaultServiceModel.create(req, (err, rows) => {
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

    defaultServiceRouters.delete('/delete/:id', (req, res) => {
        defaultServiceModel.delete(req, (err, rows) => {
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

    defaultServiceRouters.put('/update/:id', (req, res) => {
        defaultServiceModel.update(req, (err, rows) => {
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

    defaultServiceRouters.post('/delete-all', (req, res) => {
        defaultServiceModel.deleteAll(req, (err, rows) => {
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

    app.use('/default-service', defaultServiceRouters);
}

module.exports = defaultServiceRouter;