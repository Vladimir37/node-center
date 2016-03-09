var express = require('express');

var render = require('../basis/render');
var auth = require('../basis/auth');

var router = express.Router();

router.get('/', auth.check, render('main/admin'));
router.get('/login', render('main/login'));
router.post('/login', auth.login);

module.exports = router;