var formidable = require('formidable');
var text_handle = require('./text_handle');

function preview(req, res, next) {
    var form = new formidable.IncomingForm({
        uploadDir: "temp"
    });
    form.parse(req, function(err, fields) {
        var content = text_handle(fields.content);
        res.render('main/preview.jade', {
            content
        })
    });
}

module.exports = preview;