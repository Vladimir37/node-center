var models = require('./database');
var errors = require('./errors');

var re_num = new RegExp(/[0-9]+/);

function list(base, page) {
    return function(req, res, next) {
        models[base].find({}, '_id title', {
            sort: {_id: -1}
        }).then(function(links) {
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

// Packages
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
                limit: 10,
                sort: {_id: -1}
            });
        }
    }).then(function(packs) {
        res.render('main/pages/package_page', {
            addr: '/docs/packages/',
            count,
            num,
            packs
        });
    }).catch(function(err) {
        console.log(err);
        errors.e500(req, res, next);
    });
}

// API
function module_full(req, res, next) {
    var num = req.params.num;
    models.Module.findOne({
        _id: num
    }).then(function(pack) {
        if(pack) {
            res.render('main/pages/module.jade', {pack});
        }
        else {
            errors.e404(req, res, next);
        }
    }).catch(function(err) {
        console.log(err);
        errors.e500(req, res, next);
    });
}

function module_page(req, res, next) {
    var num = req.params.num;
    var count;
    models.Module.count({}).then(function(page_count) {
        count = Math.floor(page_count / 10);
        if(num < 0 || !re_num.test(num) || num > count) {
            errors.e404(req, res, next);
        }
        else {
            return models.Module.find({}, '', {
                skip: num * 10,
                limit: 10,
                sort: {_id: -1}
            });
        }
    }).then(function(packs) {
        res.render('main/pages/module_page', {
            addr: '/docs/api/',
            count,
            num,
            packs
        });
    }).catch(function(err) {
        console.log(err);
        errors.e500(req, res, next);
    });
}

// Туториалы
function tutorial_full(req, res, next) {
    var num = req.params.num;
    models.Tutorial.findOne({
        _id: num
    }).then(function(pack) {
        if(pack) {
            res.render('main/pages/tutorial.jade', {pack});
        }
        else {
            errors.e404(req, res, next);
        }
    }).catch(function(err) {
        console.log(err);
        errors.e500(req, res, next);
    });
}

function tutorial_page(req, res, next) {
    var num = req.params.num;
    var count;
    models.Tutorial.count({}).then(function(page_count) {
        count = Math.floor(page_count / 10);
        if(num < 0 || !re_num.test(num) || num > count) {
            errors.e404(req, res, next);
        }
        else {
            return models.Tutorial.find({}, '', {
                skip: num * 10,
                limit: 10,
                sort: {_id: -1}
            });
        }
    }).then(function(packs) {
        res.render('main/pages/tutorial_page', {
            addr: '/docs/tutorials/',
            count,
            num,
            packs
        });
    }).catch(function(err) {
        console.log(err);
        errors.e500(req, res, next);
    });
}

// Статьи
function article_node_full(req, res, next) {
    var num = req.params.num;
    models.ArticleNode.findOne({
        _id: num
    }).then(function(pack) {
        if(pack) {
            res.render('main/pages/article.jade', {pack});
        }
        else {
            errors.e404(req, res, next);
        }
    }).catch(function(err) {
        console.log(err);
        errors.e500(req, res, next);
    });
}

function article_node_page(req, res, next) {
    var num = req.params.num;
    var count;
    models.ArticleNode.count({}).then(function(page_count) {
        count = Math.floor(page_count / 10);
        if(num < 0 || !re_num.test(num) || num > count) {
            errors.e404(req, res, next);
        }
        else {
            return models.ArticleNode.find({}, '', {
                skip: num * 10,
                limit: 10,
                sort: {_id: -1}
            });
        }
    }).then(function(packs) {
        res.render('main/pages/article_node_page', {
            addr: '/tech/article_node/',
            count,
            num,
            packs
        });
    }).catch(function(err) {
        console.log(err);
        errors.e500(req, res, next);
    });
}
function article_other_full(req, res, next) {
    var num = req.params.num;
    models.ArticleOther.findOne({
        _id: num
    }).then(function(pack) {
        if(pack) {
            res.render('main/pages/article.jade', {pack});
        }
        else {
            errors.e404(req, res, next);
        }
    }).catch(function(err) {
        console.log(err);
        errors.e500(req, res, next);
    });
}

function article_other_page(req, res, next) {
    var num = req.params.num;
    var count;
    models.ArticleOther.count({}).then(function(page_count) {
        count = Math.floor(page_count / 10);
        if(num < 0 || !re_num.test(num) || num > count) {
            errors.e404(req, res, next);
        }
        else {
            return models.ArticleOther.find({}, '', {
                skip: num * 10,
                limit: 10,
                sort: {_id: -1}
            });
        }
    }).then(function(packs) {
        res.render('main/pages/article_other_page', {
            addr: '/tech/article_other/',
            count,
            num,
            packs
        });
    }).catch(function(err) {
        console.log(err);
        errors.e500(req, res, next);
    });
}

// books
function books(req, res, next) {
    var books_ru;
    var books_en;
    models.Book.find({
        inRussian: true
    }).then(function(books) {
        books_ru = books;
        return models.Book.find({
            inRussian: false
        });
    }).then(function(books) {
        books_en = books;
        res.render('main/pages/books', {
            books_ru,
            books_en
        });
    }).catch(function(err) {
        console.log(err);
        errors.e500(req, res, next);
    });
}

exports.list = list;
exports.package_full = package_full;
exports.package_page = package_page;
exports.module_full = module_full;
exports.module_page = module_page;
exports.tutorial_full = tutorial_full;
exports.tutorial_page = tutorial_page;
exports.article_node_full = article_node_full;
exports.article_node_page = article_node_page;
exports.article_other_full = article_other_full;
exports.article_other_page = article_other_page;
exports.books = books;