/**
 * Created by mattiden on 18.02.15.
 */
var db = require('../../../config/db');

module.exports = function(tweet, callback){
    db.query('INSERT INTO TWEET set ?', tweet, function selectCb(err, results, fields){
        if(err){
            callback(err, results);
        }
        callback(null, results)
    })
};
