var express = require('express');

var render = require('../basis/render');

var router = express.Router();

router.get('/', render('main/index'));

module.exports = router;