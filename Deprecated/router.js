var jade = require('jade');
var fs = require('fs');
var model = require('./model');
var redis = require('redis');
var red_client = redis.createClient();

function index(res, req) {
    var link = req.url;
    model.format(res, link);
};
function source(res, link) {
    var ext;
    if(link === 'style') {
        fs.readFile('client/client.less', function(err, resp) {
            if(err) {
                console.log(err);
            }
            else {
                res.end(resp);
            }
        });
    }
    else {
        fs.readFile('client/' + link + '.js', function(err, resp) {
            if(err) {
                console.log(err);
            }
            else {
                res.end(resp);
            }
        });
    }
}
function image(res, link) {
    fs.readFile('img/' + link, function(err, resp) {
        if(err) {
            console.log(err);
        }
        else {
            res.end(resp);
        }
    });
};
//Проверка на админа
function admin(req, res, link) {
    red_client.get('curPass', function(err, resp) {
        if(req.cookies.adm_pass === resp) {
            //Админпанель
            model.adminPage(res);
        }
        else {
            jade.renderFile('pages/admin_login.jade', function(err, resp) {
                res.end(resp);
            });
        }
    });
};
//Вход админа
function admin_log(req, res, link) {
    if(req.body.login === 'secret key') {
        var key = model.randKey();
        res.cookie('adm_pass', key);
        red_client.set('curPass', key);
        model.adminPage(res);
    }
    else {
        admin(req, res);
    }
};

//Создание нового тела
function admin_create(req, res, link) {
    if(link === 'book') {
        model.addBook(req, res);
        console.log('Книга');
    }
    else if(link === 'link') {
        model.addLink(req, res);
        console.log('Ссылка');
    }
    else if(link === 'tutorial') {
        model.addTutor(req, res);
        console.log('Туториал');
    }
    else if(link === 'pack') {
        model.addPack(req, res);
        console.log('Пакет');
    }
    else if(link === 'art') {
        model.addArt(req, res);
        console.log('Статья');
    }
    else {
        console.log('Несуществующий раздел');
        console.log(link);
    }
}

exports.index = index;
exports.source = source;
exports.image = image;
exports.admin = admin;
exports.admin_log = admin_log;
exports.admin_create = admin_create;