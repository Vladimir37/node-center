var models = require('./database');

function logging(name, addr) {
    models.History.create({
        name,
        addr
    }).catch(function(err) {
        console.log(err);
    });
}

module.exports = logging;