// router
const express = require('express');
const userRouters = express.Router();
const AuthMiddleWare = require('../Middleware/AuthMiddleware');
const EmailController = require('../controllers/EmailController');
const FriendController = require('../controllers/FriendController');
const userModel = require('../model/user');
const jwtHelper = require('../helpers/jwt.helper');
const bcrypt = require('bcrypt');

// Utils
const appConfig = require('../constant');

// Model
let room = require('../model/room.model');


const userRoute = (app) => {

    userRouters.post('/login', (req, res) => {
        const { userName, pass } = req.body;

        if (userName && pass) {
            userModel.login(req, async (err, rows, fields) => {
                const user = rows[0];

                if (!err) {
                    if (rows.length > 0) {

                        if (bcrypt.compareSync(pass, rows[0].pass)) {

                            const accessToken = await jwtHelper.generateToken(rows[0], appConfig.ACCESS_TOKEN_SECERET, appConfig.ACCESS_TOKEN_LIFE)
                            res.send({
                                status: res.statusCode,
                                message: "Login success",
                                data: {
                                    token: accessToken,
                                    user: {
                                        id: user.id,
                                        userName: user.userName,
                                        fullName: user.fullName,
                                        role: user.role
                                    }
                                }
                            })
                        }
                        else {
                            res.send({
                                message: 'Your password is wrong, please type again !'
                            })
                        }
                    }
                    else {
                        res.send({
                            message: 'Can\'t find user please sign in again!'
                        })
                    }
                } else console.log(err)
            })
        }
    })

    userRouters.post('/register', (req, res) => {

        userModel.register(req, (err, rows, fields) => {
            if (!err) {
                if (rows) {
                    res.send({
                        status: res.statusCode,
                        message: 'Register Success',
                        data: {
                            status: 1
                        }
                    })
                }
            }
            else {
                res.send({
                    message: err
                })
            }
        })
    });

    userRouters.post('/send-mail', EmailController.sendMail);

    userRouters.use(AuthMiddleWare.isAuth);

    userRouters.get('/get-user/:id?', (req, res) => {
        const { id } = req.params;
        if (!id) {
            userModel.getAll((err, rows, fields) => {
                if (!err) {
                    res.send({
                        message: 'Get Users success',
                        status: res.statusCode,
                        data: {
                            users: rows
                        }
                    })
                }
                else {
                    res.send({
                        message: 'Can\'t get users',
                        error: err
                    })
                }
            })
        } else {
            userModel.get(id, (err, rows) => {
                if (!err) {
                    res.send({
                        message: 'Get user success',
                        status: res.statusCode,
                        data: {
                            user: rows[0]
                        }
                    })
                } else {
                    res.send({
                        message: 'Can\'t get user',
                        error: err
                    })
                }
            })
        }
    })

    userRouters.post('/validate', (req, res) => {
        res.send({
            status: res.statusCode,
            message: 'Validate success',
            data: {
                status: 1
            }
        })
    })

    userRouters.get('/friends', FriendController.friendLists);

    app.use('/user', userRouters);
}

module.exports = userRoute;