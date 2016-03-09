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
models.ArticleOther = mongoose.model('ArticleNode', articleOtherSchema);

//links
var linkScheme = new mongoose.Schema({
    link: String,
    description: String
});
models.Link = mongoose.model('Link', linkScheme);

//tutorials
var tutorialScheme = new mongoose.Schema({
    title: String,
    source: String,
    cover: String,
    text: String
});
models.Tutorial = mongoose.model('Tutorial', tutorialScheme);

//packages and modules
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
models.Module = mongoose.model('Package', moduleSchema);

var toolSchema = new mongoose.Schema({
    title: String,
    cover: String,
    text: String
});
models.Tool = mongoose.model('Tool', toolSchema);

mongoose.connect('mongodb://localhost/node_center');

module.exports = models;