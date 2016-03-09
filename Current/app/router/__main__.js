var express = require('express');

var render = require('../basis/render');
var admin = require('./admin');
var docs = require('./docs');
var tech = require('./tech');

var router = express.Router();

router.get('/', render('main/index'));

router.use('/admin', admin);

router.use('/docs', docs);
router.use('/tech', tech);

module.exports = router;