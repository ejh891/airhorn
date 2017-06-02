var bodyParser = require('body-parser');
var express = require('express');
var app = express();

var port = process.env.API_PORT || 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var BababasDb = require('./data/bababa');

var COUNT;

var readCounter = function(callback) {
    if (COUNT !== undefined) {
      var result = {};
      result._doc = {};
      result._doc.count = COUNT;
      callback(undefined, result);
    }
    else {
      BababasDb.findOne({}, callback);
    }
};

var writeCounter = function(newCount, callback) {
    BababasDb.findOneAndUpdate({}, {count: newCount}, callback);
};

var subscribers = [];
setInterval(function() {
  var subscriberIds = subscribers.map(function(o) { return o.id });
  console.log("subscribers: " + subscriberIds.toString());
}, 3*1000);

// process each subscriber and send the latest count
var notifySubscribers = function() {
  while (subscribers.length > 0) {
    var subscriber = subscribers.shift();
    clearTimeout(subscriber.timeoutId);
    console.log("subscriber: " + subscriber.id + " was notified");
    var data = {};
    data.count = COUNT;
    subscriber.res.json(data);
  }
}

// prevent Cross Origin Resource Sharing errors
app.use(function(req, res, next) {
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader('Access-Control-Allow-Credentials', 'true');
 res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
 res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
 next();
});

app.post('/api/incrementCounter', function(req, res) {
  writeCounter(COUNT + 1, function(err, counter) {
        if (err) {
          console.log(err);
          res.sendStatus(500);
        } else {
          COUNT++;
          notifySubscribers();
          res.sendStatus(200);
        }
    });
});

app.get('/api/readCounter', function(req, res) {
  var data = {};
  readCounter(function(err, result) {
      if (err) { 
        console.log(err);
      }
      else if (!result) {
        console.log('No documents found in database');
      }
      else {
        COUNT = result._doc.count;
        data.count = COUNT;
        res.json(data);
      }
    });
});

var subscriberId = 0;
app.get('/api/subscribeToCounter', function(req, res) {
  var subscriber = {
    id: subscriberId++,
    res: res,
    timeoutId: setTimeout(function () {
      console.log("subscriber: " + subscriber.id + " timed out");
      var subscriberIndex = subscribers.indexOf(subscriber);
      if (subscriberIndex !== -1) {
        subscribers.splice(subscriberIndex, 1);
        subscriber.res.json({});
      }
    }, 25*1000)
  };
  console.log("registered subscriber: " + subscriber.id);
  subscribers.push(subscriber);
});

app.listen(port, function() {
    console.log('Api listening on port ' + port);
})