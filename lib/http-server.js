'use strict';

var app = exports = module.exports = {}; // jshint ignore: line

var http = require('http'),
    time = require('./server-time'),
    url = require('url');

app.startServer = function() {

  this.server = http.createServer(function(req, res) {
    res.writeHead(200, {
      'Content-Type': 'text/plain'
    });
    
    var url1 = req.url;
    console.log('Request recieved for: ' + url1);

    var url1Obj = url.parse(url1, true);

    var dirArr = url1Obj.pathname.split('/');
    var name = dirArr[dirArr.length-1];
    name = (name === '' || name === 'name') ? 'anonymous' : name;
    var isNameReq = (dirArr[1] === 'name');

    // We only have a pathname that can handle 2 nested dirs, otherwise we send 404
    if ( dirArr.length > 3) {
      res.write('404 Not Found');
      res.end();
    }

    if (url1 === '/time') {
      res.write('Current Server Time is: ' + time.time());
    } else if (url1 === '/') {
      res.write('index');
    } else if (isNameReq) {
      res.write('Hello ' + name + '!!\nWelcome to the internet.');
    }

    res.end();
  });

  this.server.listen(3333);
};
