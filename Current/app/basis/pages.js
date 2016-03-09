var models = require('./database');
var errors = require('./errors');

function list(base, page) {
    return function(req, res, next) {
        models[base].find({}, '_id title').then(function(links) {
            res.render('main/list.jade', {
                page,
                links
            });
        }).catch(function(err) {
            console.log(err);
            errors.e500(req, res, next);
        });
    }
}

function package_full(req, res, next) {
    var num = req.params.num;
    models.Package.findOne({
        _id: num
    }).then(function(pack) {
        if(pack) {
            res.render('main/pages/package.jade', {pack});
        }
        else {
            errors.e404(req, res, next);
        }
    }).catch(function(err) {
        console.log(err);
        errors.e500(req, res, next);
    });
}

exports.list = list;
exports.package_full = package_full;