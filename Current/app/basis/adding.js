var formidable = require('formidable');
var fs = require('fs');
var mime = require('mime-types');

var models = require('./database');
var errors = require('./errors');
var text_handling = require('./text_handle');

function article(req, res, next) {
    var form = new formidable.IncomingForm({
        uploadDir: "temp"
    });
    form.parse(req, function(err, fields) {
        var type_article = fields.type == 'node' ? 'Node' : 'Other';
        var title = fields.title;
        var source = fields.source;
        var cover = text_handling(fields.cover);
        var text = text_handling(fields.text);
        var tags = fields.tags.split(' ');
        models['Article' + type_article].create({
            title,
            source,
            cover,
            text,
            tags
        }).then(function() {
            res.end('Succces!');
        }).catch(function(err) {
            console.log(err);
            errors.e500(req, res, next);
        });
    });
}

function link(req, res, next) {
    var form = new formidable.IncomingForm({
        uploadDir: "temp"
    });
    form.parse(req, function(err, fields) {
        var link = fields.link;
        var description = fields.description;
        models.Link.create({
            link,
            description
        }).then(function() {
            res.end('Succces!');
        }).catch(function(err) {
            console.log(err);
            errors.e500(req, res, next);
        });
    });
}

function tutorial(req, res, next) {
    var form = new formidable.IncomingForm({
        uploadDir: "temp"
    });
    form.parse(req, function(err, fields) {
        var title = fields.title;
        var source = fields.source;
        var cover = text_handling(fields.cover);
        var text = text_handling(fields.text);
        var tags = fields.tags.split(' ');
        models.Tutorial.create({
            title,
            source,
            cover,
            text,
            tags
        }).then(function() {
            res.end('Succces!');
        }).catch(function(err) {
            console.log(err);
            errors.e500(req, res, next);
        });
    });
}

function packages(req, res, next) {
    var form = new formidable.IncomingForm({
        uploadDir: "temp"
    });
    form.parse(req, function(err, fields) {
        var title = fields.title;
        var cover = text_handling(fields.cover);
        var text = text_handling(fields.text);
        var source = fields.source;
        models.Package.create({
            title,
            source,
            cover,
            text
        }).then(function() {
            res.end('Succces!');
        }).catch(function(err) {
            console.log(err);
            errors.e500(req, res, next);
        });
    });
}

function modules(req, res, next) {
    var form = new formidable.IncomingForm({
        uploadDir: "temp"
    });
    form.parse(req, function(err, fields) {
        var title = fields.title;
        var cover = text_handling(fields.cover);
        var text = text_handling(fields.text);
        models.Module.create({
            title,
            cover,
            text
        }).then(function() {
            res.end('Succces!');
        }).catch(function(err) {
            console.log(err);
            errors.e500(req, res, next);
        });
    });
}

function tool(req, res, next) {
    var form = new formidable.IncomingForm({
        uploadDir: "temp"
    });
    form.parse(req, function(err, fields) {
        var title = fields.title;
        var cover = text_handling(fields.cover);
        var text = text_handling(fields.text);
        models.Tool.create({
            title,
            cover,
            text
        }).then(function() {
            res.end('Succces!');
        }).catch(function(err) {
            console.log(err);
            errors.e500(req, res, next);
        });
    });
}

function book(req, res, next) {
    var form = new formidable.IncomingForm({
        uploadDir: "temp"
    });
    form.parse(req, function(err, fields, files) {
        var title = fields.title;
        var author = fields.cover;
        var description = text_handling(fields.description);
        var inRussian = Boolean(fields.inRussian);
        var image = files.image;
        var image_name = +new Date() + '.' + mime.extension(image.type);
        fs.rename(image.path, 'client/source/img/added/' + image_name, function(err) {
            if(err) {
                console.log(err)
            }
        });
        models.Book.create({
            title,
            author,
            description,
            image: image_name,
            inRussian
        }).then(function() {
            res.end('Succces!');
        }).catch(function(err) {
            console.log(err);
            errors.e500(req, res, next);
        });
    });
}

exports.article = article;
exports.link = link;
exports.tutorial = tutorial;
exports.packages = packages;
exports.modules = modules;
exports.tool = tool;
exports.book = book;