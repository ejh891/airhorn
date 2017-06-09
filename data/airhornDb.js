/*eslint-disable no-console */

var mongoose = require('mongoose');

var dbUser = process.env.DBUSER;
var dbPass = process.env.DBPASS;
mongoose.connect('mongodb://' + dbUser + ':' + dbPass + '@ds153521.mlab.com:53521/baabababababaa');

var airhornFeedSchema = mongoose.Schema({
    message : { type: mongoose.Schema.Types.String, required: false},
    group : { type: mongoose.Schema.Types.String, required: true},
    createdUts : { type: mongoose.Schema.Types.Number, required: true, default: Math.floor(Date.now() / 1000) }
});

let processAirhornMessageDocument = (airhornMessageDocument) => {
    return {
        message: airhornMessageDocument.message,
        group: airhornMessageDocument.group,
        createdUts: airhornMessageDocument.createdUts
    }
};

var AirhornDb = {};
AirhornDb.airhornMessage = mongoose.model('airhornMessage', airhornFeedSchema, 'airhornFeed');

const FEED_LIMIT = 10;
AirhornDb.readFeed = (group, callback) => {
    AirhornDb.airhornMessage
        .find({group: group, message: {"$ne": ""}})
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
            let messages = results.map( (result) => { 
                return processAirhornMessageDocument(result);
            });

            callback(messages);
        }
    });
}

AirhornDb.writeMessageToFeed = (data, callback) => {
    var newMessage = new AirhornDb.airhornMessage({
        message: data.message,
        group: data.group
    });

    newMessage.save((err, savedResult) => {
        callback(err);
    });
}

module.exports = AirhornDb;
