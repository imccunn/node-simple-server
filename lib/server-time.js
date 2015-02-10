'use strict';

var app = exports = module.exports = {}; // jshint ignore: line

app.time = function() {
  var date = new Date();
  var time = '' + this.format(date.getHours()) + ':' + this.format(date.getMinutes()) + ':' + this.format(date.getSeconds());
  return time;
};

app.format = function(value) {
  var val = value.toString();
  return (val < 10) ? '0' + val : val;
};
