var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var httpServer = require('http').Server(app);
var socketServer = require('socket.io')(httpServer);

var port = process.env.API_PORT || 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var AirhornDb = require('./data/airhornDb');

// prevent Cross Origin Resource Sharing errors
app.use((req, res, next) => {
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader('Access-Control-Allow-Credentials', 'true');
 res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
 res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
 next();
});

app.post('/api/incrementCounter', (req, res) => {
  AirhornDb.incrementCounter((err, count) => {
        if (err) {
          console.log(err);
          res.sendStatus(500);
        } 
        else {
            socketServer.emit('updatedCount', count);
            res.sendStatus(200);
        }
    });
});

app.get('/api/readCounter', (req, res) => {
  var data = {};
  AirhornDb.readCounter((count) => {
        data.count = count;
        res.json(data);
    });
});

httpServer.listen(port, () => {
    console.log('Api listening on port ' + port);
});