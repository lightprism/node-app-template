var passport = require('passport');
var strategy = require('passport-local').Strategy;
var mongodb = require('mongodb').MongoClient;

module.exports = function() {
  
  passport.use(new strategy({
    
      usernameField: 'username',
      passwordField: 'password'
  }, function(username, password, done) {
      var url = 'mongodb://localhost/book_app_temp';
      mongodb.connect(url, function(error, db) {
        var collection = db.collection('users');
        collection.findOne({username: username}, function(error, results) {
          if(results.password === password) {
            var user = results;
            done(null, user); // once everything is good, we call done, and be done with this
          } else {
            done(null, false, {message: 'bad password'}); // user is false, and null for no errors, triggers failureRedirect
          }
        });
      });
  }));  
};