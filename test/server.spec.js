/**
 * Created by mattiden on 12.02.15.
 */
var superagent = require('superagent');
var expect = require('expect.js');

var apiUrl = 'http://localhost:8080/v1';

describe('Server tests', function(){
    var db = require('../config/db');


    it('should respond with same payload as sent', function(done){
        message = {'message': 'Hello!', "posterid": 76};
        superagent.post(apiUrl + '/post')
            .send(message)
            .end(
            function(err, res){
                expect(res.body).to.eql(message);
                done()
            }
        )
    });
});
