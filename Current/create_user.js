var process = require('process');

var models = require('./app/basis/database');

var name = process.argv[2];
var pass = process.argv[3];

models.Admin.create({
    name,
    pass
}).then(function() {
    console.log('Created!')
}).catch(function(err) {
    console.log(err)
});