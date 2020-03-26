// Libraries
const mongoClient = require('mongodb');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const roomRoutes = express.Router();

require('dotenv').config();

// Model
let room = require('./model/room.model');

// Define server
const PORT = process.env.PORT || 8000;
const app = express();
const server = http.createServer(app);


app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello mọi người')
})

require('./routes/room')(app);
require('./routes/user')(app);

server.listen(PORT, () => {
    console.log('Server is run as port: ', PORT)
})
