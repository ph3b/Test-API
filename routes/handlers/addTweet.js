var db = require('../../config/db');
var addTweetToDb = require('./dbhandlers/addTweetToDb');

module.exports = function(req, res) {
    var tweet = req.body;

    addTweetToDb(tweet, function(err, results){
         if (err) {
            res.status(500);
            res.send(err);
        }
        tweet.tweetid = results.insertId;
        res.status(200);
        res.send(tweet)
    })
}
