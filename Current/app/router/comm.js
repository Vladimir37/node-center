var express = require('express');

var render = require('../basis/render');
var redirect = require('../basis/redirect');
var pages = require('../basis/pages');

var router = express.Router();

router.get('/', render('main/crossroads/comm'));

router.get('/events/list', pages.list('Event', '/comm/events'));
router.get('/events/item/:num', pages.event_full);
router.get('/events/:num', pages.event_page);
router.get('/events/', redirect('/comm/events/0'));

router.get('/en', pages.comm_en);
router.get('/ru', pages.comm_ru);

module.exports = router;