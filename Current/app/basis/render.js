function render(name) {
    return function(req, res, next) {
        res.render(name + '.jade');
    }
}

module.exports = render;