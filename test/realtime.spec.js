/**
 * Created by mattiden on 18.02.15.
 */
/**
 * Created by mattiden on 12.02.15.
 */
var superagent = require('superagent');
var expect = require('expect.js');
var io = require('socket.io-client');

var socketUrl = 'http://localhost:8080';

var options = {
    transports: ['websocket'],
    'force new connection': true
};

describe('Twitter live-feed', function(){

    it('should broadcast new tweet when new tweet added',function(done){
        var user = io.connect(socketUrl, options);
        var tweet = {"message":"Tweet from testfile", "posterid": 25};

        user.emit('new tweet', tweet);
        user.on('new tweet', function(data){
            expect(tweet.message).to.eql('Tweet from testfile');
            done()
        });
    })

});
