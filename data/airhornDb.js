var mongoose = require('mongoose');

var dbUser = process.env.DBUSER;
var dbPass = process.env.DBPASS;
mongoose.connect('mongodb://' + dbUser + ':' + dbPass + '@ds153521.mlab.com:53521/baabababababaa');

var airhornSchema = mongoose.Schema({
    count : { type: mongoose.Schema.Types.Number, required: true }
});

var AirhornDb = mongoose.model('airhornSchema', airhornSchema, 'airhornCounter');

var _countCache;
AirhornDb.readCounter = (callback) => {
    if (_countCache !== undefined) {
      callback(_countCache);
    }
    else {
        AirhornDb.findOne({}, (err, result) => {
            if (err) { 
                console.log(err);
            }
            else if (!result) {
                console.log('No documents found in database');
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
        AirhornDb.findOneAndUpdate({}, {count: count + 1}, (err, result) => {
            if (!err) {
                _countCache++;
            }
            callback(err, _countCache);
        });
    })
};

module.exports = AirhornDb;
