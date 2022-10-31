const express = require('express');
const http = require('http')
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'iab/build')));

app.get('/', function(req, res)  {
    res.sendFile(path.join(__dirname, 'iab/build/index.html'));
});

const server = http.createServer(app);
const PORT = 8001;

server.listen(PORT, function() {
    console.log('Sever running on :', PORT)
});