// router
const express = require('express');
const contractRouters = express.Router();
const authMiddleware = require('../Middleware/AuthMiddleware');

// Model
const contractModel = require('../model/contract');
const roomImageModel = require('../model/roomImage');

const contractRouter = (app) => {

    contractRouters.use(authMiddleware.isAuth)

    contractRouters.get('/get-contracts', (req, res) => {
        contractModel.getAll(req, async (err, rows, fields) => {

            if (!err) {
                res.send({
                    status: res.statusCode,
                    message: 'Get contracts success',
                    data: {
                        contracts: rows
                    }
                })
            }
        })

    })

    contractRouters.post('/create', (req, res) => {
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
        contractModel.delete(req, (err, rows) => {
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

    contractRouters.put('/update/:id', (req, res) => {
        contractModel.update(req, (err, rows) => {
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

    contractRouters.post('/delete-all', (req, res) => {
        contractModel.deleteAll(req, (err, rows) => {
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