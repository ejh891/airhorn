'use strict'

var bodyParser = require('body-parser');
var express = require('express');
var app = express();

var port = process.env.API_PORT || 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// prevent Cross Origin Resource Sharing errors
app.use(function(req, res, next) {
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader('Access-Control-Allow-Credentials', 'true');
 res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
 res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
 next();
});

var COUNT = 15;
app.get('/api/readCounter', function(req, res) {
    res.json({count: COUNT});
});

app.post('/api/incrementCounter', function(req, res) {
    COUNT++;
    res.sendStatus(200);
});

app.listen(port, function() {
    console.log('Api listening on port ' + port);
})