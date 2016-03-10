var express = require('express');

var render = require('../basis/render');
var redirect = require('../basis/redirect');
var pages = require('../basis/pages');

var router = express.Router();

router.get('/list', pages.list('Tool', '/tools'));
router.get('/item/:num', pages.tool_full);
router.get('/:num', pages.tool_page);
router.get('/', redirect('/tools/0'));

module.exports = router;