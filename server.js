// Libraries
const mongoClient = require('mongodb');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();


// Define server
const PORT = process.env.PORT || 8000;
const app = express();
const server = http.createServer(app);


app.use(cors());
app.use(bodyParser.json());

app.use(express.static(__dirname + '/Application/build'));
app.get('/', (req, res) => {
    res.send('Hello mọi người')
})

require('./routes/room')(app);
require('./routes/user')(app);
require('./routes/block')(app);
require('./routes/room')(app);

server.listen(PORT, () => {
    console.log('Server is run as port: ', PORT)
})
