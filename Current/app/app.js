var express =  require('express');
var cookieParser = require('cookie-parser');
var favicon = require('serve-favicon');

var app = express();

//render templates
app.set('view engine', 'jade');
app.set('views', __dirname +  '/../client/view');

//cookies
app.use(cookieParser());

//favicon
app.use(favicon(_dirname + '/client/source/img/main/favicon.ico'));

//user files
app.use('/', express.static(__dirname + '/../client/views/other'));

//Errors
app.use(errors.e404);
app.use(errors.render);