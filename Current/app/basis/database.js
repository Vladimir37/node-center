var mongoose = require('mongoose');

var connection = mongoose.connection;

//connection check
connection.on('open', function() {
    console.log('Connection to DB created!');
});
connection.on('error', function(err) {
    console.log('Error connect to DB!');
    console.log(err);
});

// Models
var models = {};
//admins
var adminSchema = new mongoose.Schema({
    name: String,
    pass: String
});
models.Admin = mongoose.model('Admin', adminSchema);

//books
var bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    description: String,
    image: String,
    inRussian: Boolean
});
models.Book = mongoose.model('Book', bookSchema);

//articles Node.js
var articleNodeSchema = new mongoose.Schema({
    title: String,
    source: String,
    cover: String,
    text: String,
    tags: Array
});
models.ArticleNode = mongoose.model('ArticleNode', articleNodeSchema);

//articles other
var articleOtherSchema = new mongoose.Schema({
    title: String,
    source: String,
    cover: String,
    text: String,
    tags: Array
});
models.ArticleOther = mongoose.model('ArticleOther', articleOtherSchema);

//links
var linkSchema = new mongoose.Schema({
    link: String,
    description: String
});
models.Link = mongoose.model('Link', linkSchema);

//community
var communitySchema = new mongoose.Schema({
    link: String,
    description: String,
    inRussian: Boolean
});
models.Community = mongoose.model('Community', communitySchema);

//tutorials
var tutorialSchema = new mongoose.Schema({
    title: String,
    source: String,
    cover: String,
    text: String,
    tags: Array
});
models.Tutorial = mongoose.model('Tutorial', tutorialSchema);

//packages and API
var packageSchema = new mongoose.Schema({
    title: String,
    source: String,
    cover: String,
    text: String
});
models.Package = mongoose.model('Package', packageSchema);

var moduleSchema = new mongoose.Schema({
    title: String,
    source: String,
    cover: String,
    text: String
});
models.Module = mongoose.model('Module', moduleSchema);

// tools
var toolSchema = new mongoose.Schema({
    title: String,
    cover: String,
    text: String
});
models.Tool = mongoose.model('Tool', toolSchema);

//events
var eventSchema = new mongoose.Schema({
    title: String,
    cover: String,
    text: String,
    date: Date
});
models.Event = mongoose.model('Event', eventSchema);

// history
var historySchema = new mongoose.Schema({
    addr: String,
    name: String
});
models.History = mongoose.model('History', historySchema);

mongoose.connect('mongodb://localhost/node_center');

//for(var i = 0; i < 85; i++) {
//    models.Tool.create({
//        title: 'Инструмент ' + i,
//        cover: 'Ковёр',
//        text: 'Текст'
//    })
//}

module.exports = models;