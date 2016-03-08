var http = require('http');

var app = require('./app/app');

http.createServer(app).listen(49004);