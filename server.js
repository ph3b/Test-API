/**
 * Created by mattiden on 12.02.15.
 */
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = require('./routes/routes.js')
var cors = require('cors');


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

var port = process.env.PORT || 8080;


app.use('/v1', router);
app.listen(port);
console.log("Listening on port: " + port);
