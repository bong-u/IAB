const express = require('express');
const http = require('http')
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.set('views', './views');


const server = http.createServer(app);
const PORT = 8001;

const router = require('./router/router');

server.listen(PORT, function() {
    console.log('Sever running on :', PORT)
});

app.use('/', router);