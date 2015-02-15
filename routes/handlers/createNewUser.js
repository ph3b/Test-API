/**
 * Created by mattiden on 13.02.15.
 */
var db = require('../../config/db');
var bcrypt = require('bcrypt');
var auth = require('../../config/auth.js');
var jwt = require('jsonwebtoken');


var secret = auth.tokenSecret;

module.exports = function(req, res){
        user = {"username": req.body.username, "password": bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null)};
        db.query("INSERT INTO user set ?", user, function(err, response){

            if(!err){
                var token = jwt.sign({username: user.username}, secret, { expiresInMinutes: 60});
                res.status(200);
                res.send({"message":"ok", "token":token})
            }
            else if(err){
                res.send('error')
            }
        })
};
