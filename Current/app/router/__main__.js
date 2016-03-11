var express = require('express');

var render = require('../basis/render');
var admin = require('./admin');
var docs = require('./docs');
var tech = require('./tech');
var tools = require('./tools');
var tag = require('../basis/tags');

var router = express.Router();

router.get('/', render('main/index'));

router.use('/admin', admin);

router.use('/docs', docs);
router.use('/tech', tech);
router.use('/tools', tools);
router.use('/about', render('main/about'));

router.use('/tag/:tag', tag);

module.exports = router;