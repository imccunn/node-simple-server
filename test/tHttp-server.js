'use strict';

require('../lib/http-server').startServer();
var chai = require('chai'),
    chaihttp = require('chai-http'),
    time = require('../lib/server-time');

chai.use(chaihttp);

var expect = chai.expect;

describe('Tests for http server', function() {
  var server = 'localhost:3333';
  var checkTime = time.time();

  it('should respond to a request for the time route and return the server time', function(done) {
    chai.request(server)
      .get('/time')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql('Current Server Time is: ' + checkTime);
        done();
      });
  });
  it('should respond to a request to the name route and send anon if no specified name', function(done) {
    chai.request(server)
      .get('/name')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql('Hello anonymous!!\nWelcome to the internet.');
        done();
      });
  });

  it('should respond to a request with a pathname under \'name\' and send that text back', function(done) {
    chai.request(server)
      .get('/name/Richard')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql('Hello Richard!!\nWelcome to the internet.');
        done();
      });
  });
  it('should respond to a request for a default route or root (/)', function(done) {
    chai.request(server)
      .get('/')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql('index');
        done();
      });
  });
});
