// Libraries
const mongoClient = require('mongodb');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');


require('dotenv').config();


// Define server
const PORT = process.env.PORT || 8000;
const app = express();
const server = http.createServer(app);


app.use(cors());
app.use(bodyParser.json());
app.use('/public', express.static('public'));
app.get('/', (req, res) => {
    res.send('Hello mọi người')
})

require('./routes/room')(app);
require('./routes/user')(app);
require('./routes/block')(app);
require('./routes/room')(app);
require('./routes/service')(app);
require('./routes/defaultService')(app);
require('./routes/unit')(app);
require('./routes/upload')(app);
require('./routes/customer')(app);
require('./routes/contract')(app);

server.listen(PORT, () => {
    console.log('Server is run as port: ', PORT)
})
