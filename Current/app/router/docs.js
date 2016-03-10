var express = require('express');

var render = require('../basis/render');
var redirect = require('../basis/redirect');
var pages = require('../basis/pages');

var router = express.Router();

router.get('/api/list', pages.list('Module', '/docs/api'));
router.get('/api/item/:num', pages.module_full);
router.get('/api/:num', pages.module_page);
router.get('/api', redirect('/docs/api/0'));

router.get('/packages/list', pages.list('Package', '/docs/packages'));
router.get('/packages/item/:num', pages.package_full);
router.get('/packages/:num', pages.package_page);
router.get('/packages', redirect('/docs/packages/0'));

router.get('/tutorials/list', pages.list('Tutorial', '/docs/tutorials'));
router.get('/tutorials/item/:num', pages.tutorial_full);
router.get('/tutorials/:num', pages.tutorial_page);
router.get('/tutorials', redirect('/docs/tutorials/0'));

router.get('/install');

module.exports = router;