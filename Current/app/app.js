var express = require('express');
var cookieParser = require('cookie-parser');
var favicon = require('serve-favicon');

var router = require('./router/__main__');
var errors = require('./basis/errors');
var db = require('./basis/database');

var app = express();

//render templates
app.set('view engine', 'jade');
app.set('views', __dirname +  '/../client/view');

//cookies
app.use(cookieParser());

//favicon
app.use(favicon(__dirname + '/../client/source/img/main/favicon.ico'));

app.use('/', router);

//public source
app.use('/src', express.static(__dirname + '/../client/source'));

//errors
app.use(errors.e404);
app.use(errors.render);

module.exports = app;