'use strict';

var app = exports = module.exports = {}; // jshint ignore: line

var http = require('http'),
    time = require('./server-time'),
    url = require('url'),
    fs = require('fs');

app.startServer = function() {

  this.server = http.createServer(function(req, res) {
    res.writeHead(200, {
      'Content-Type': 'text/plain'
    });
    
    var rUrl = req.url;
    console.log('Request recieved for: ' + rUrl);

    var url1Obj = url.parse(rUrl, true),
        dirArr = url1Obj.pathname.split('/');

    if (rUrl === '/') {
      res.write('welcome to the internet');
    } else if (dirArr[1] === 'time') {
      res.write('Current Server Time is: ' + time.time());
    } else if (dirArr[1] === 'name') {
      res.write('Hello ' + dirArr[2] + '!!\nWelcome to the internet.');
    } else {
      res.write('You requested ' + rUrl + '\n');
      res.write('404 Not Found');
    }

    res.end();
  });

  this.server.listen(3333);
};
