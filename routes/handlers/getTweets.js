/**
 * Created by mattiden on 13.02.15.
 */
var db = require('../../config/db');

module.exports = function(req, res){
    db.query("SELECT * FROM tweet", function(err, tweets){
        if(err){
            res.send(err)
        }
        else {
           res.send(tweets)
        }
    })

};
