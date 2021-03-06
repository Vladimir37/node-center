var express = require('express');

var render = require('../basis/render');
var pages = require('../basis/pages');
var admin = require('./admin');
var docs = require('./docs');
var tech = require('./tech');
var comm = require('./comm');
var tag = require('../basis/tags');

var router = express.Router();

router.get('/', pages.index);

router.use('/admin', admin);

router.use('/docs', docs);
router.use('/tech', tech);
router.use('/comm', comm);
router.use('/about', render('main/about'));

router.use('/tag/:tag', tag);

module.exports = router;