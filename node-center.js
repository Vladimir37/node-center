var http = require('http');
var express = require('express');
var favicon = require('serve-favicon');
var cookie = require('cookie-parser');
var form_parser = require('body-parser');
var router = require('./router');

var app = express(); 
app.use(favicon('img/favicon.ico'));
app.use(cookie());
app.use(form_parser());

//Сырцы
app.get('/source/:name?', function(req, res) {
    var link = req.params.name;
    router.source(res, link);
});
//Изображения
app.get('/image/*', function(req, res) {
    var link = req.url.slice(6);
    router.image(res, link);
});
//Админка
app.get('/administration/', function(req, res) {
	router.admin(req, res);
});
app.post('/administration/', function(req, res) {
	router.admin_log(req, res);
	console.log('Админ подключается');
});
app.post('/administration/:name?', function(req, res) {
	var link = req.params.name;
	router.admin_create(req, res, link);
	console.log('Создание нового');
});
//Основной контент
app.get('*', function(req, res) {
    router.index(res, req);
});

http.createServer(app).listen(82);