var express = require('express');

var render = require('../basis/render');
var admin = require('./admin');

var router = express.Router();

router.get('/', render('main/index'));

router.use('/admin', admin);

module.exports = router;