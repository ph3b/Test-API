/**
 * Created by mattiden on 12.02.15.
 */
var superagent = require('superagent');
var expect = require('expect.js');
var apiUrl = 'http://localhost:8080/v1';

describe('Tweet tests', function(){
    var db = require('../config/db');

    it('should add tweet to database', function(done){
        //Log in with correct credentials
        user = {"username": "mathias", "password": "123456"};

        superagent.post(apiUrl + '/login')
            .send(user)
            .end(function(err, res){
                var token = res.body.token;
                var message = {"message": "Hello!", "posterid": 25};
                superagent.post(apiUrl + '/tweet')
                    .send(message)
                    .set('x-auth', token)
                    .end(
                    function(err, res){
                        expect(res.body.message).to.eql("Hello!");
                        expect(res.body.tweetid).to.be.a('number');
                        done();
                    }
                );
            })
    });
    it('should throw error when token is invalid', function(done){
        message = {"message": "Hello!", "posterid": 25};
        var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6Im1hdGhpYXMiLCJpYXQiOjE0MjM4MzE4MTUsImV4cCIkfMTQyMzgzNTQxNX0.9cs3AlX8TupI7wbtBABDwbvgwuyiHOSGDMYYTC_qrs0';
        superagent.post(apiUrl + '/tweet')
            .send(message)
            .set('x-auth', token)
            .end(
            function(err, res){
                expect(res.status).to.eql(403)
                expect(res.body.message).to.eql("not authenticated");
                done();
            }
        );
    });
    it('should get all tweets',function(done){
        superagent.get(apiUrl + '/tweet')
            .end(function(err, res){
                expect(res.body).to.be.a('array');
                done();
            })
    })
});
