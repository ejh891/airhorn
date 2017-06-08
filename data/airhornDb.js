var mongoose = require('mongoose');

var dbUser = process.env.DBUSER;
var dbPass = process.env.DBPASS;
mongoose.connect('mongodb://' + dbUser + ':' + dbPass + '@ds153521.mlab.com:53521/baabababababaa');

var airhornCountSchema = mongoose.Schema({
    count : { type: mongoose.Schema.Types.Number, required: true }
});

var airhornFeedSchema = mongoose.Schema({
    message : { type: mongoose.Schema.Types.String, required: true},
    createdUts : { type: mongoose.Schema.Types.Number, required: true, default: Math.floor(Date.now() / 1000) }
});

var AirhornDb = {};
AirhornDb.airhornCounter = mongoose.model('airhornCounter', airhornCountSchema, 'airhornCounter');
AirhornDb.airhornMessage = mongoose.model('airhornMessage', airhornFeedSchema, 'airhornFeed');

var _countCache;
AirhornDb.readCounter = (callback) => {
    if (_countCache !== undefined) {
      callback(_countCache);
    }
    else {
        AirhornDb.airhornCounter.findOne({}, (err, result) => {
            if (err) { 
                console.log(err);
            }
            else if (!result) {
                console.log('No documents found in collection');
            }
            else {
                _countCache = result._doc.count;
                callback(_countCache);
            }
        });
    }
};

AirhornDb.incrementCounter = (callback) => {
    AirhornDb.readCounter((count) => {
        AirhornDb.airhornCounter.findOneAndUpdate({}, {count: count + 1}, (err, result) => {
            if (!err) {
                _countCache++;
            }
            callback(err, _countCache);
        });
    });
};

const FEED_LIMIT = 10;
var _feedCache;
AirhornDb.readFeed = (callback) => {
    if (_feedCache !== undefined) {
      callback(_feedCache.slice(0, FEED_LIMIT));
    }
    else {
        AirhornDb.airhornMessage
            .find({})
            .sort("-createdUts")
            .limit(FEED_LIMIT)
            .exec( (err, results) => {
            if (err) { 
                console.log(err);
            }
            else if (!results) {
                console.log('No documents found in collection');
            }
            else {
                _feedCache = results.map((result) => { return { message: result.message, createdUts: result.createdUts } });

                callback(_feedCache);
            }
        });
    }
}

AirhornDb.writeMessageToFeed = (message, callback) => {
    var newMessage = new AirhornDb.airhornMessage({ message: message });
    AirhornDb.readFeed( (feed) => {
        newMessage.save((err, savedResult) => {
            if (!err) {
                _feedCache = [{message: savedResult.message, createdUts: savedResult.createdUts}].concat(feed);
            }
            callback(err);
        });
    });
}

module.exports = AirhornDb;
