// router
const express = require('express');
const customRouters = express.Router();
const authMiddleware = require('../Middleware/AuthMiddleware');

// Model
const customerModel = require('../model/customer');

const customRouter = (app) => {

    customRouters.use(authMiddleware.isAuth)

    customRouters.get('/get-customers', (req, res) => {
        customerModel.getAll(req, (err, rows) => {
            if (!err) {
                res.send({
                    status: res.statusCode,
                    message: 'Get customers success',
                    data: {
                        customers: rows
                    }
                })
            }
        })
    })

    customRouters.post('/create', (req, res) => {
        customerModel.create(req, (err, rows) => {
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

    customRouters.delete('/delete/:id', (req, res) => {
        customerModel.delete(req, (err, rows) => {
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

    customRouters.put('/update/:id', (req, res) => {
        customerModel.update(req, (err, rows) => {
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

    customRouters.post('/delete-all', (req, res) => {
        customerModel.deleteAll(req, (err, rows) => {
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

    app.use('/customer', customRouters);
}

module.exports = customRouter;