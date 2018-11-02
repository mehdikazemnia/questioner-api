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
                res.json({
                    err: 'token not found!, you should first visit "/" to get a new token',
                    next: '/'
                });
            }
        });
    } else {
        res.json({
            err: 'you should first visit "/" to get a token, otherwise the case is that you didn`t pass the token',
            next: '/'
        });
    }
}