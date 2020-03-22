// router
const express = require('express'); 
const userRouters = express.Router();
const AuthMiddleWare = require('../Middleware/AuthMiddleware');
const AuthController = require('../controllers/AuthController');
const EmailController = require('../controllers/EmailController');
const FriendController = require('../controllers/FriendController');

// Model
let room = require('../model/room.model');


const userRoute = (app) => {
    userRouters.post('/login', AuthController.login);
    userRouters.post('/refresh-token', AuthController.refreshToken);

    userRouters.post('/send-mail', EmailController.sendMail);

    userRouters.post('/register', AuthController.register);

    userRouters.use(AuthMiddleWare.isAuth);

    userRouters.get('/friends', FriendController.friendLists);

    app.use('/user', userRouters);
}

module.exports = userRoute;