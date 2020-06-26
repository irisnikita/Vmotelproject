// router
const express = require('express');
const userRouters = express.Router();
const AuthMiddleWare = require('../Middleware/AuthMiddleware');
const EmailController = require('../controllers/EmailController');
const FriendController = require('../controllers/FriendController');
const userModel = require('../model/user');
const jwtHelper = require('../helpers/jwt.helper');
const bcrypt = require('bcrypt');
const { mailRegisterSucces } = require('../node_mailer');
const { verifyToken } = require('../helpers/jwt.helper');

// AppConfig
const appConfig = require('../constant');

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
                                        role: user.role,
                                        avatar: user.avatar || '',
                                        email: user.email,
                                        phoneNumber: user.phoneNumber
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
                    mailRegisterSucces({
                        to: req.body.email,
                        subject: 'Bạn đã đăng ký thành công tài khoản',
                        text: 'Cảm ơn bạn đã dùng thử ứng dụng quản lý khu trọ của chúng tôi, chúng bạn có một sự trải nghiệm tuyêt vời, xin cảm ơn!'
                    })

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

    userRouters.use(AuthMiddleWare.isAuth);

    userRouters.post('/validate', async (req, res) => {
        const { token } = req.query;

        const data = await verifyToken(token, appConfig.ACCESS_TOKEN_SECERET);

        if (data.data) {
            res.send({
                status: res.statusCode,
                message: 'Validate success',
                data: {
                    user: data.data,
                    status: 1
                }
            })
        } else {
            res.send({
                message: 'Failed token'
            })
        }


    })

    userRouters.get('/friends', FriendController.friendLists);

    app.use('/user', userRouters);
}

module.exports = userRoute;