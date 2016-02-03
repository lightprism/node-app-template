var express = require('express');
var authRouter = express.Router();
var mongodb = require('mongodb').MongoClient; // just pulling in one thing so far
var passport = require('passport');

var router = function() {
    authRouter.route('/signUp')
        .post(function(req, res) {
            console.log(req.body); // nice little json object with data
            // connect to mongodb
            var url = 'mongodb://localhost/book_app_temp';
            mongodb.connect(url, function(error, db) {
                var collection = db.collection('users');
                var user = {
                    username: req.body.username,
                    password: req.body.password
                };
                collection.insert(user, function(error, results ) {
                    req.login(results.ops[0], function() {
                       res.redirect('/auth/profile'); 
                    });
                });
            });
        });
    authRouter.route('/signIn')
        .post(passport.authenticate('local', {
            failureRedirect: '/'
        }), function(req, res) {
            res.redirect('/auth/profile');
        });
    authRouter.route('/profile')
        .get(function(req, res) {
           res.json(req.user); 
        });
    return authRouter
};

module.exports = router;