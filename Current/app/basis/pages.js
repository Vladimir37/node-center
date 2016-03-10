var models = require('./database');
var errors = require('./errors');

var re_num = new RegExp(/[0-9]+/);

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

function package_page(req, res, next) {
    var num = req.params.num;
    var count;
    models.Package.count({}).then(function(page_count) {
        count = Math.floor(page_count / 10);
        if(num < 0 || !re_num.test(num) || num > count) {
            errors.e404(req, res, next);
        }
        else {
            return models.Package.find({}, '', {
                skip: num * 10,
                limit: 10
            });
        }
    }).then(function(packs) {
        res.render('main/pages/package_page', {
            count,
            num,
            packs
        });
    }).catch(function(err) {
        console.log(err);
        errors.e500(req, res, next);
    });
}

exports.list = list;
exports.package_full = package_full;
exports.package_page = package_page;