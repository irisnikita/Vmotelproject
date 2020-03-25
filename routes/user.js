// router
const express = require('express'); 
const userRouters = express.Router();
const AuthMiddleWare = require('../Middleware/AuthMiddleware');
const AuthController = require('../controllers/AuthController');
const EmailController = require('../controllers/EmailController');
const FriendController = require('../controllers/FriendController');
const userModel = require('../model/user');
const bcrypt = require('bcrypt');

// Utils
const appConfig = require('../constant');

// Model
let room = require('../model/room.model');


const userRoute = (app) => {
    userRouters.post('/login', AuthController.login);
    userRouters.post('/refresh-token', AuthController.refreshToken);

    userRouters.post('/login2', (req, res) => {
        const {userName, pass} = req.body;

        if(userName && pass) {
            userModel.login(req, (err, rows, fields) => {
                if(!err) {
                    if(rows.length > 0) {

                        if(bcrypt.compareSync(pass,rows[0].pass)) {
                            res.send(rows[0])
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
            if(!err) {
                if(rows) {
                    res.send(rows)
                }
            } else {
                res.send('Failed to register User')
                console.log(err)
            }
        })
    });

    userRouters.post('/send-mail', EmailController.sendMail);

    userRouters.get('/get-user/:id?', (req, res) => {
        const {id} = req.params;
        if(!id) {
            userModel.getAll((err, rows, fields) => {
                if(!err) {
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
                        message: 'Can\'t get users'
                    })
                }
            })
        }
    })

    userRouters.use(AuthMiddleWare.isAuth);

    userRouters.get('/friends', FriendController.friendLists);

    app.use('/user', userRouters);
}

module.exports = userRoute;