var formidable = require('formidable');

var models = require('./database');
var errors = require('./errors');

function login(req, res, next) {
    var form = new formidable.IncomingForm({
        uploadDir: "temp"
    });
    form.parse(req, function(err, fields) {
        if(err) {
            console.log(err);
            errors.e500(req, res, next);
        }
        models.Admin.findOne({
            name: fields.login,
            pass: fields.pass
        }).then(function(admin) {
            if(admin) {
                res.cookie('node_center_adm', admin._id);
                res.redirect('/admin');
            }
            else {
                res.redirect('/admin/login');
            }
        }).catch(function(err) {
            console.log(err);
            errors.e500(req, res, next);
        });
    });
}

function check(req, res, next) {
    var cookie = req.cookies.node_center_adm;
    if(!cookie) {
        errors.e404(req, res, next);
    }
    models.Admin.findById(cookie).then(function(admin) {
        if(admin) {
            next();
        }
        else {
            errors.e404(req, res, next);
        }
    }).catch(function(err) {
        console.log(err);
        errors.e500(req, res, next);
    });
}

exports.login = login;
exports.check = check;