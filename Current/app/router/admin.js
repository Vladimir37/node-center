var express = require('express');

var render = require('../basis/render');
var auth = require('../basis/auth');
var adding = require('../basis/adding');
var preview = require('../basis/preview');

var router = express.Router();

router.get('/', auth.check, render('main/admin'));

router.get('/login', render('main/login'));
router.post('/login', auth.login);

router.post('/article', auth.check, adding.article);
router.post('/link', auth.check, adding.link);
router.post('/tutorial', auth.check, adding.tutorial);
router.post('/packages', auth.check, adding.packages);
router.post('/modules', auth.check, adding.modules);
router.post('/tool', auth.check, adding.tool);
router.post('/book', auth.check, adding.book);
router.post('/event', auth.check, adding.event);
router.post('/community', auth.check, adding.community);

router.post('/preview', auth.check, preview);

module.exports = router;