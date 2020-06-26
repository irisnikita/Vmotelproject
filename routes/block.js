// router
const express = require('express');
const blockRouters = express.Router();
const AuthMiddleWare = require('../Middleware/AuthMiddleware');
const blockModel = require('../model/block');
const jwtHelper = require('../helpers/jwt.helper');
const bcrypt = require('bcrypt');

const blockRouter = (app) => {


	//blockRouters.use(AuthMiddleWare.isAuth);

    blockRouters.post('/create', (req, res) => {
        blockModel.create(req, (err, rows) => {
            if (!err) {
                res.send({
                    status: res.statusCode,
                    message: 'Create block success',
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

    blockRouters.get('/get-block/:id?', (req, res) => {
        blockModel.getAll(req, (err, rows) => {
            if (!err) {
                res.send({
                    status: res.statusCode,
                    message: 'Get Blocks success',
                    data: {
                        blocks: rows
                    }
                })
            } else {
                res.send({
                    message: err
                })
            }
        })
    })

    blockRouters.delete('/delete/:id?', (req, res) => {
        const { id } = req.params;

        blockModel.delete(req, (err, rows) => {
            if (!err) {
                res.send({
                    status: res.statusCode,
                    message: 'Delete Block success',
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

    blockRouters.post('/delete-all', (req, res) => {
        blockModel.deleteAll(req, (err, rows) => {
            if (!err) {
                res.send({
                    status: res.statusCode,
                    message: 'Delete Success',
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

    blockRouters.put('/update/:id', (req, res) => {
        blockModel.update(req, (err, rows) => {
            if (!err) {
                res.send({
                    status: res.statusCode,
                    message: 'Update Success',
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

    app.use('/block', blockRouters);
}

module.exports = blockRouter;
