var passport = require('passport');
var strategy = require('passport-local').Strategy;

module.exports = function() {
  passport.use(new strategy({
      usernameField: 'username',
      passwordField: 'password'
  }, function(username, password, done) {
      var user = {
          username: username,
          password: password
      };
      
      done(null, user);
  }));  
};