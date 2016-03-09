var express = require('express');

var render = require('../basis/render');
var pages = require('../basis/pages');

var router = express.Router();

router.get('/api');
router.get('/api/list', pages.list('Module', '/docs/api'));
router.get('/api/item/:num');

router.get('/packages');
router.get('/packages/list', pages.list('Package', '/docs/packages'));
router.get('/packages/item/:num', pages.package_full);

router.get('/tutorials');
router.get('/tutorials/list', pages.list('Tutorial', '/docs/tutorials'));
router.get('/tutorials/item/:num');

router.get('/install');

module.exports = router;