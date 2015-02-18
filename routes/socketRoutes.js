/**
 * Created by mattiden on 18.02.15.
 */
/**
 * Created by mattiden on 12.02.15.
 */
var addTweetToDb = require('./handlers/addTweet.js');
var db = require('../config/db');

module.exports = function(io){
    io.on('connection', function(socket){
        socket.on('new tweet', function(tweet){

            db.query('INSERT INTO TWEET set ?', tweet, function selectCb(err){
                if(err){
                    socket.emit('error', 'Error adding tweet');
                }
                io.emit('new tweet', tweet);
            });
        });
    });
};
