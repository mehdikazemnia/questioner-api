const User = require('../models/User.js');
module.exports = function (req, res, next) {
    if (req.body.token) {
        User.findOne({
            token: req.body.token
        }).then((user) => {
            if (user) {
                res.locals.user = user;
                next();
            } else {
                res.redirect('/');
            }

        });
        next();
    } else {
        res.redirect('/');
    }
}