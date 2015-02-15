/**
 * Created by mattiden on 13.02.15.
 */
var superagent = require('superagent');
var expect = require('expect.js');
var jwt = require('jwt-simple');
var db = require('../config/db');

var secret = 'rebekkaisreallycute';

var apiUrl = 'http://localhost:8080/v1';

describe('Auth, login/logout, create user tests', function(){


    it('should give error when user tried non-existing username', function(done){
        //Log in with wrong credentials
        user = {"username": "kalle", "password": "123456"};

        superagent.post(apiUrl + '/login')
            .send(user)
            .end(function(err, res){
                expect(res.status).to.be(401);
                expect(res.body.message).to.eql("failed");
                done();
            })
    });

    it('should add new user to database', function(done){
        user = {"username": "supermatt", "password":"123456"};
        superagent.post(apiUrl + '/signup')
            .send(user)
            .end(function(err, res){
                expect(res.body.message).to.eql('ok');
                expect(res.body.token).to.be.a('string');
                expect(res.body.token.split(".")).to.have.length(3);

                db.query('DELETE FROM user WHERE username=?', "supermatt", function(err ,resp){
                    done();
                });

            })
    });

    it('should tell user when wrong credentials are used', function(done){
        //Log in with wrong credentials
        user = {"username": "mathias", "password": "wrongpassword"};

        superagent.post(apiUrl + '/login')
            .send(user)
            .end(function(err, res){
                expect(res.status).to.be(401);
                expect(res.body.message).to.eql("failed");
                done();
            })
    });


    it('should allow user to log in with correct credentials and give valid token', function(done){
        //Log in with correct credentials
        user = {"username": "mathias", "password": "123456"};

        superagent.post(apiUrl + '/login')
            .send(user)
            .end(function(err, res){
                expect(res.status).to.be(200);
                expect(res.body.message).to.eql("ok");
                expect(res.body.token).to.be.a('string');
                expect(res.body.token.split(".")).to.have.length(3);
               // console.log('\n' + res.body.token);

                done();
            })
    });
});
