var express = require('express');

var render = require('../basis/render');
var redirect = require('../basis/redirect');
var pages = require('../basis/pages');

var router = express.Router();

router.get('/article_node/list', pages.list('ArticleNode', '/tech/article_node'));
router.get('/article_node/item/:num', pages.article_node_full);
router.get('/article_node/:num', pages.article_node_page);
router.get('/article_node', redirect('/tech/article_node/0'));

router.get('/article_other/list', pages.list('ArticleOther', '/tech/article_other'));
router.get('/article_other/item/:num', pages.article_other_full);
router.get('/article_other/:num', pages.article_other_page);
router.get('/article_other', redirect('/tech/article_other/0'));

module.exports = router;