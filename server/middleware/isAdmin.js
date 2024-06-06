const passport = require('passport');
require('express-session');
require('../routes/auth/passport');

function isAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user.role === 'admin') {
        return next();
    }
    res.status(401).send('Unauthorized');
}

module.exports = isAdmin;