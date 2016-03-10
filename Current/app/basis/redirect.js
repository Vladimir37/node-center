function redirect(path) {
    return function(req, res, next) {
        res.redirect(path);
    }
}

module.exports = redirect;