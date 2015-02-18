/**
 * Created by mattiden on 12.02.15.
 */
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = require('./routes/routes.js');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var cors = require('cors');
require('./routes/socketRoutes.js')(io);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

var port = process.env.PORT || 8080;

app.use('/v1', router);
http.listen(port, function(){
    console.log("Listening on port: " + port);
});

