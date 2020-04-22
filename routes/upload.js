const express = require('express');
const uploadRouters = express.Router();
const authMiddleware = require('../Middleware/AuthMiddleware');
const multer = require('multer');

const uploadRouter = (app) => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'public/images/avatars')
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + '-' + file.originalname)
        }
    })
    const upload = multer({ storage }).single('file');

    uploadRouters.post('/userAvatar', (req, res) => {
        upload(req, res, (err) => {
            if (err instanceof multer.MulterError) {
                return res.status(500).json(err)
            } else if (err) {
                return res.status(500).json(err)
            } else {
                return res.status(200).send({
                    status: res.statusCode,
                    message: 'Upload avatar success',
                    data: req.file
                })
            }
        })
    })

    uploadRouters.post('/rooms', (req, res) => {
        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, 'public/images/rooms')
            },
            filename: (req, file, cb) => {
                cb(null, Date.now() + '-' + file.originalname)
            }
        })
        const upload = multer({ storage }).single('file');

        upload(req, res, (err) => {
            if (err instanceof multer.MulterError) {
                return res.status(500).json(err)
            } else if (err) {
                return res.status(500).json(err)
            } else {
                return res.status(200).send(req.file)
            }
        })
    })

    app.use('/upload', uploadRouters)

}

module.exports = uploadRouter;