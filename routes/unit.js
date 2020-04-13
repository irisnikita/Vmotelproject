// router
const express = require('express');
const unitRouters = express.Router();
const authMiddleware = require('../Middleware/AuthMiddleware');

// Model
const unitModel = require('../model/unit');

const unitRouter = (app) => {

    unitRouters.use(authMiddleware.isAuth)

    unitRouters.get('/get-units', (req, res) => {
        unitModel.getAll(req, (err, rows) => {
            if (!err) {
                res.send({
                    status: res.statusCode,
                    message: 'Get units success',
                    data: {
                        units: rows
                    }
                })
            }
        })
    })

    unitRouters.post('/create', (req, res) => {
        unitModel.create(req, (err, rows) => {
            if (!err) {
                res.send({
                    status: res.statusCode,
                    message: 'Create Services success',
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

    unitRouters.delete('/delete/:id', (req, res) => {
        unitModel.delete(req, (err, rows) => {
            if (!err) {
                res.send({
                    status: res.statusCode,
                    message: 'Delete service success',
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

    unitRouters.put('/update/:id', (req, res) => {
        unitModel.update(req, (err, rows) => {
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

    unitRouters.post('/delete-all', (req, res) => {
        unitModel.deleteAll(req, (err, rows) => {
            if (!err) {
                res.send({
                    status: res.statusCode,
                    message: 'Delete Services success',
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

    app.use('/unit', unitRouters);
}

module.exports = unitRouter;