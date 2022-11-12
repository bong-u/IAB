const express = require('express');
const http = require('http')
const path = require('path');
const cors = require('cors');

const app = express();
app.use(express.static(path.join(__dirname, 'iab/build')));
app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true
}))
app.use(express.json());

const router = require('./router/router');

app.use('/', router);

const server = http.createServer(app);
const PORT = 3001;

server.listen(PORT, function() {
    console.log('Sever running on :', PORT)
});