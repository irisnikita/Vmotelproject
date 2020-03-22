// router
const express = require('express'); 
const roomRouters = express.Router();
const authMiddleware = require('../Middleware/AuthMiddleware');

// Model
let room = require('../model/room.model');


const roomRoute = (app) => {

    roomRouters.use(authMiddleware.isAuth)


    roomRouters.route('/').get((req, res) => {
        room.find((err, rooms) => {
            if(err) {
                console.log(err)
            } else {
                res.send(rooms);
            }
        })
    })

    app.use('/room', roomRouters);
}

module.exports = roomRoute;