/**
 * Created by mattiden on 12.02.15.
 */
var express = require('express');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

var addTweetToDb = require('./handlers/addTweetToDb.js');
var checkCredentials = require('./handlers/checkCredentials.js');
var createNewUser = require('./handlers/createNewUser.js');
var getTweets = require('./handlers/getTweets.js');

var auth = require('../config/auth.js');



var router = express.Router();

router.post('/login', checkCredentials);

router.post('/signup', createNewUser);

router.post('/tweet', isAuthenticated, addTweetToDb);

router.get('/tweet', getTweets);

router.post('/post', function(req, res){
    res.status(200);
    res.send(req.body);
});

module.exports = router;


var secret = auth.tokenSecret;

function isAuthenticated(req, res, next){
    var errorMsg = {"message":"not authenticated"}
    var token = req.headers['x-auth'];
    jwt.verify(token, secret, function(err, decoded){
        if(!err){
            next();
        } else {
            res.status(403);
            res.send(errorMsg);
        }
    });
}
