// write a function we are going to use as middleware
module.exports = function(req, res, next) {
    if (!req.user) {
        req.flash('eror', 'You must be logged in to view this page.');
        res.redirect('/auth/login');
    } else {
        next();
    }
}

