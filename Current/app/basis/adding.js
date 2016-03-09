var formidable = require('formidable');

var models = require('./database');
var errors = require('./errors');

function article(req, res, next) {
    var form = new formidable.IncomingForm({
        uploadDir: "temp"
    });
    form.parse(req, function(err, fields) {
        //
    });
}