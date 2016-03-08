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
//admins
var adminSchema = new mongoose.Schema({
    name: String,
    pass: String
});
var Admin = mongoose.model('Admin', adminSchema);

//books
var bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    description: String,
    image: String,
    inRussian: Boolean
});
var Book = mongoose.model('Book', bookSchema);

//articles
var articleSchema = new mongoose.Schema({
    title: String,
    source: String,
    cover: String,
    text: String,
    tags: Array
});

mongoose.connect('mongodb://localhost/node_center');

module.exports = mongoose;