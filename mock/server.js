/* jshint node: true */
/* eslint-disable */

"use strict";
var jsonServer = require('json-server');
var jetpack = require('fs-jetpack');
var ip = require('ip');
var fetc = require('isomorphic-fetch')

var MOCK_SERVER_PORT = 3002;
var server = jsonServer.create();

var watchFiles = {};
var jsonFiles = jetpack.cwd('./mock/json').find({ matching: '**/*.json' });


jsonFiles.forEach(function (path) {
  var code = path.split('.')[0];

  watchFiles[code] = require('./json/' + path);
});
var router = jsonServer.router(watchFiles);
//
var middleware = jsonServer.defaults();
//
server.use(middleware);

server.use(function (req, res, next) {
  if (req.method === 'POST') {
    var mockAddress = 'http://' + ip.address() + ':' + MOCK_SERVER_PORT;
    var fullPath = mockAddress + req.originalUrl;
    fetch(fullPath, {
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      }
    }).then(function (reponse) {
      return reponse.json();
    }, function () {
      console.log("mock server redirect reject");
    }).then(function (json) {
      res.jsonp(json);
    }).catch(function (err) {
      console.err("mock server err");
      console.err(err);
    });
  } else {
    next();
  }
});
//
server.use(router);
server.listen(MOCK_SERVER_PORT);
