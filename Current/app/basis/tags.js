var models = require('./database');
var errors = require('./errors');

function tag_search(req, res, next) {
    var tag = req.params.tag;
    var results = {tag};
    models.ArticleNode.find({
        tags: {
            $in: [tag]
        }
    }).then(function(articles) {
        results.node = articles;
        return models.ArticleOther.find({
            tags: {
                $in: [tag]
            }
        });
    }).then(function(articles) {
        results.other = articles;
        return models.Tutorial.find({
            tags: {
                $in: [tag]
            }
        });
    }).then(function(articles) {
        results.tutorials = articles;
        res.render('main/tag', results);
    }).catch(function(err) {
        console.log(err);
        errors.e500(req, res, next);
    });
}

module.exports = tag_search;