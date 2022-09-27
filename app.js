const express = require('express');
const http = require('http')
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

const server = http.createServer(app);
const PORT = 8181;

const indexRouter = require('./router/index');

server.listen(PORT, function() {
    console.log('Sever running on :', PORT)
});

app.use('/index', indexRouter);