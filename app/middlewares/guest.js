const User = require('../models/User.js');
module.exports = function (req, res, next) {
    if (req.body.token) {
        res.json({
            err: 'to visit this url, you must not be a logged user, visit /reset to logout',
            next: '/reset'
        });
    } else {
        next();
    }
}