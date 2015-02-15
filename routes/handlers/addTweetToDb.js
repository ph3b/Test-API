/**
 * Created by mattiden on 12.02.15.
 */
var db = require('../../config/db');

module.exports = function(req, res){
    tweet = req.body;
    db.query('INSERT INTO TWEET set ?', tweet, function selectCb(err, results, fields){
        if(err){
            res.status(500)
            res.send(err);
        }
        res.status(200)
        res.send({"message": "Tweet added", "tweetid": results.insertId})
    })
};
