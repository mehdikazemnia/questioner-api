const User = require('../models/User.js');
const Question = require('../models/Question.js');
module.exports = function (req, res, next) {
    if (req.body.token) {
        User.findOne({
            token: req.body.token
        }).then((user) => {
            if (user) {
                res.locals.user = user;
                Question.findOne({
                    id: req.params.qid
                }).then((question) => {
                    if (question) {
                        res.locals.question = question;
                        if (question.prev) {
                            if (user.sheet.hasOwnProperty(question.prev)) {
                                next();
                            } else {
                                res.json({
                                    err: 'your not allowed to answer this question at the time',
                                    next: '/' + question.prev
                                });
                            }
                        } else {
                            next();
                        }
                    } else {
                        res.json({
                            err: 'question not found',
                            next: '/'
                        });
                    }
                });

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