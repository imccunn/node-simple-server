'use strict';

var app = exports = module.exports = {}; // jshint ignore: line
var server = require('./lib/http-server');

app.main = function() {
  server.startServer();
};

app.main();
