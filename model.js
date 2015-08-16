var formidable = require('formidable');
var mysql = require('mysql');
var path = require('path');
var jade = require('jade');
var fs = require('fs');
var redis = require('redis');
var form_parser = require('body-parser');
var red_client = redis.createClient();

var db_data;
fs.readFile('db.json', function(err, data) {
	if(err) {
		console.log(err);
	}
	else{
		db_data = JSON.parse(data);
	}
});

var node_pages;
fs.readFile('frame.json', function(err, data) {
	if(err) {
		console.log(err);
	}
	else{
		node_pages = JSON.parse(data);
	}
});

//Рендер страницы
function render(res, name, vars) {
	vars = vars || null;
	if(name === 'err_nf') {
		res.writeHead(404);
	}
	else {
		res.writeHead(200);
	}
	jade.renderFile('pages/' + name + '.jade', vars, function(err, resp) {
		if(err) {
			console.log(err);
		}
		else {
			res.end(resp);
		}
	});
};

//Удаление пустых элементов массива
function delEmpty(arr) {
	var new_arr = arr;
	for (var i = 0; i < new_arr.length; i++) {
		if(new_arr[i].length === 0) {
			arr.splice(i, 1);
		}
	};
	return new_arr;
};

//Обработка запроса и вывод результата
function format(res, link) {
	var address = link.split('/');
	var result = delEmpty(address);
	if(result.length === 1) {
		if(result[0] === '') {
			render(res, 'index');
		}
		else {
			for(var k in node_pages) {
				if(k === result[0]) {
					if(node_pages[k].segment) {
						var panels = {
							segment: true,
							parts: node_pages[k].parts
						};
						render(res, k, panels);
					}
					else {
						render(res, k);
					};
				}
			};
			render(res, 'err_nf');
		}
	}
	else if(result.length === 2) {
		if(result[0] === 'about' || result[0] === 'docs') {
			if(result[1] === 'about') {
				//Создание объекта из базы
				var panels = {
					segment: true,
					parts: node_pages[result[0]].parts
				};
				render(res, result[0], panels);
			}
			else {
				var col_parts = Object.keys(node_pages[result[0]].parts).length;
				var succsess = false;
				//Проверка существования страницы по запросу
				for(var i = 0; i < col_parts; i++) {
					var key = Object.keys(node_pages[result[0]].parts)[i];
					if(key === result[1]) {
						succsess = true;
						//Запрос в больщую базу
						var db_connect = mysql.createConnection(db_data);
						db_connect.query('SELECT * FROM ' + result[1], function(err, rows) {
							//Создание объекта из малой базы
							console.log(err);
							var panels = {
								segment: true,
								parts: node_pages[result[0]].parts,
								model: rows,
								parent: result[0]
							};
							render(res, 'subpages/' + result[1], panels);
						});
					}
				};
				if(!succsess) {
					render(res, 'err_nf');
				}
			}
		}
		else {
			render(res, 'err_nf');
		}
	}
	else if(result.length === 3) {
		//Проверка на сегментирование раздела
		if(node_pages[result[0]].subsegment) {
			var db_connect = mysql.createConnection(db_data);
			//Проверка в базе
			db_connect.query('SELECT * FROM `' + result[1] + '` WHERE `link` = "' + result[2] + '"', function(err, rows) {
				if(err || rows[0] == undefined) {
					console.log(err);
					render(res, 'err_nf');
				}
				else {
					var panels = {
						segment: true,
						parts: node_pages[result[0]].parts,
						model: rows,
						parent: result[0]
					};
					render(res, 'subpages/' + result[1] + '_pt', panels);
				}
			});
		}
		else {
			render(res, 'err_nf');
		}
	}
	else {
		render(res, 'err_nf');
	};
};

//Генерация рандомного ключа
function randKey() {
	function randomInteger() {
		var rand = 0 - 0.5 + Math.random() * (9 - 0 + 1)
		rand = Math.round(rand);
		return rand;
	};
	var result = '';
	for(var i = 0; i < 12; i++) {
		result += randomInteger();
	};
	return result;
};

//Рендер админки
function adminPage(res) {
	render(res, 'admin');
}

//Создание книги
function addBook(req, res) {
	var form = new formidable.IncomingForm();
	form.uploadDir = 'img/temp';
	form.parse(req, function(err, fields, files) {
		fs.rename(files.cover.path, 'img/books/' + files.cover.name, function(err) {
			var db_connect = mysql.createConnection(db_data);
			db_connect.query('INSERT INTO `node_center`.`books` (`name`, `autor`, `desc`, `img`, `lang`) VALUES ("' + fields.name + '", "' + fields.autor + '", "' + fields.desc + '", "' + files.cover.name + '", ' + fields.lang + ');', function(err) {
				if(err) {
					console.log(err);
				};
				render(res, 'admin');
			});
		});
	});
};

//Создание ссылки
function addLink(req, res) {
	var db_connect = mysql.createConnection(db_data);
	db_connect.query('INSERT INTO `node_center`.`links` (`link`, `desc`) VALUES ("' + req.body.link + '", "' + req.body.desc + '");', function(err) {
		if(err) {
			console.log(err);
		};
		render(res, 'admin');
	});
};

//Создание туториала
function addTutor(req, res) {
	var db_connect = mysql.createConnection(db_data);
	db_connect.query('INSERT INTO `node_center`.`tutorials` (`name`, `text`, `link`, `origin`, `cover`) VALUES ("' + req.body.name + '", "' + req.body.text + '", "' + req.body.link + '", "' + req.body.origin + '", "' + req.body.cover + '")', function(err) {
		if(err) {
			console.log(err);
		};
		render(res, 'admin');
	});
};

//Создание пакета
function addPack(req, res) {
	var db_connect = mysql.createConnection(db_data);
	db_connect.query('INSERT INTO `node_center`.`packages` (`name`, `text`, `link`, `cover`, `req`) VALUES ("' + req.body.name + '", "' + req.body.text + '", "' + req.body.link + '", "' + req.body.cover + '", "' + req.body.req + '")', function(err) {
		if(err) {
			console.log(err);
		};
		render(res, 'admin');
	});
};
//Создание статьи
function addArt(req, res) {
	var db_connect = mysql.createConnection(db_data);
	var topic;
	if(req.body.top == 1) {
		topic = 'other';
	}
	else {
		topic = 'node';
	}
	db_connect.query('INSERT INTO `node_center`.`' + topic + '` (`name`, `origin`, `cover`, `text`, `tags`, `link`) VALUES ("' + req.body.name + '", "' + req.body.origin + '", "' + req.body.cover + '", "' + req.body.text + '", "' + req.body.tags + '", "' + req.body.link + '");', function(err) {
		if(err) {
			console.log(err);
		};
		render(res, 'admin');
	});
};

exports.format = format;
exports.randKey = randKey;
exports.adminPage = adminPage;
exports.addBook = addBook;
exports.addLink = addLink;
exports.addTutor = addTutor;
exports.addPack = addPack;
exports.addArt = addArt;