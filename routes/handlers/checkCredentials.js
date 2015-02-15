/**
 * Created by mattiden on 13.02.15.
 */
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var db = require('../../config/db');
var auth = require('../../config/auth.js');

var secret = auth.tokenSecret;

module.exports = function(req, res){
    db.query('SELECT * FROM user WHERE username = ?', req.body.username, function(err, response){
        if (response.length === 1 && bcrypt.compareSync(req.body.password,response[0].password)) {
                var username = req.body.username;
                var token = jwt.sign({username: username}, secret, {expiresInMinutes: 60});
                res.status(200);
                res.send({"message": "ok", "token": token});
        }
        else {
            res.status(401)
            res.send({"message": "failed"})
        }
    });
};


