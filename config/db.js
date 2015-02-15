var mysql = require('mysql');

var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'root',
    database : 'twitterDB',
    port : 8889
});
connection.connect();
console.log("Connected to MySQL database.");


module.exports = connection;
