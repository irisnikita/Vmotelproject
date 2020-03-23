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


// const url = "mongodb+srv://nltruongvi:TjmWjm824594@cluster0-vzakd.mongodb.net/motelproject?retryWrites=true&w=majority";

// mongoose.connect(url,{useUnifiedTopology: true,useNewUrlParser: true,});

// const connection = mongoose.connection;

// connection.once('open', function() {
//     console.log("Mongodb is connection successfully")
// })

app.get('/', (req, res) => {
    res.send('Hello mọi người')
})

require('./routes/room')(app);
require('./routes/user')(app);

server.listen(PORT, () => {
    console.log('Server is run as port: ', PORT)
})
