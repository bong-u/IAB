const express = require('express');

const app = express();

app.listen(8181, function() {
    console.log('express on 8181')
});

app.get('/', function(req, res) {
    res.send('<h1>hello express</h1>')
})