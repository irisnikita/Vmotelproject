// router
const express = require('express');
const serviceRouters = express.Router();
const authMiddleware = require('../Middleware/AuthMiddleware');

// Model
const serviceModel = require('../model/service');

const serviceRouter = (app) => {

    serviceRouters.use(authMiddleware.isAuth)

    serviceRouters.get('/get-services', (req, res) => {
        serviceModel.getAll(req, (err, rows) => {
            if (!err) {
                res.send({
                    status: res.statusCode,
                    message: 'Get services success',
                    data: {
                        services: rows
                    }
                })
            }
        })
    })

    serviceRouters.post('/create', (req, res) => {
        serviceModel.create(req, (err, rows) => {
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

    serviceRouters.delete('/delete/:id', (req, res) => {
        serviceModel.delete(req, (err, rows) => {
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

    serviceRouters.put('/update/:id', (req, res) => {
        serviceModel.update(req, (err, rows) => {
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

    serviceRouters.post('/delete-all', (req, res) => {
        serviceModel.deleteAll(req, (err, rows) => {
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

    app.use('/service', serviceRouters);
}

module.exports = serviceRouter;