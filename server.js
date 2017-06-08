/*eslint-disable no-console */

var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var httpServer = require('http').Server(app);
var socketServer = require('socket.io')(httpServer);

var port;
if (process.env.NODE_ENV === "production") {
    port = process.env.PORT;
}
else {
    port = 3001;
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var AirhornDb = require('./data/airhornDb');

app.use('/', express.static(__dirname + '/build'));

// prevent Cross Origin Resource Sharing errors
app.use((req, res, next) => {
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader('Access-Control-Allow-Credentials', 'true');
 res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
 res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
 next();
});

socketServer.on('connection', function(socket){
    socket.on('incrementCounter', function (eventData) {
        AirhornDb.incrementCounter((err, count) => {
            if (err) {
                console.log(err);
            }
            else {
                var data = {};
                data.count = count;
                data.message = eventData.message ? eventData.message : null;
                socketServer.emit('updatedCount', data);
            }
        });
        AirhornDb.writeMessageToFeed(eventData.message, (err) => {
            if (err) {
                console.log(err);
            }
        });
    });
});

app.get('/api/readCounter', (req, res) => {
  var data = {};
  AirhornDb.readCounter((count) => {
        data.count = count;
        res.json(data);
    });
});

app.get('/api/readFeed', (req, res) => {
    var data = {};
    AirhornDb.readFeed((messages) => {
        data.messages = messages;
        res.json(data);
    });
});

httpServer.listen(port, () => {
    console.log('App running on port: ' + port);
});