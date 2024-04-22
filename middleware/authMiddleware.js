function ensureAuthenticated(req, res, next) {
    console.log(req.session);
    if (req.session && req.session.user) {
        return next();
    } else {
        req.flash('error', 'Please login to view this page.');
        res.redirect('/auth/login');
    }
}

function checkAdmin(req, res, next) {
    if (req.session && req.session.user && req.session.user.role === 'admin') {
        return next();
    } else {
        res.status(403).send('Unauthorized');
    }
}

function checkUser(req, res, next) {
    if (req.session && req.session.user && req.session.user.role === 'user') {
        return next();
    } else {
        res.status(403).send('Unauthorized');
    }
}

module.exports = {
    ensureAuthenticated,
    checkAdmin,
    checkUser
};
