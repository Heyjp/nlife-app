var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/users.js');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

module.exports = function (passport) {

  passport.serializeUser(function(user, done) {
  done(null, user.id);
});

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
});

    passport.use('local-login', new LocalStrategy({
      passReqToCallback: true
    },
      function(req, username, password, done) {
        User.findOne({ username: username }, function(err, user) {
          if (err) { return done(err); }
          if (!user) {
            return done(null, false);
          }
          if (!isValidPassword(user, password)) {
            return done(null, false);
          }
          var token = generateToken(user);

          return done(null, {user, token});
        });
      }
));

passport.use('local-signup', new LocalStrategy({
		passReqToCallback: true
	},
		function(req, username, password, done){
			findOrCreateUser = function(){
				// Find a user with this username
				User.findOne({username: username}, function(err, user){
					if(err){
						console.log('Error: '+err);
						return done(err);
					}
					// Does user exist?
					if(user){
						console.log('That user already exists');
						return done(null, false);
					} else {
						var newUser = new User();

						newUser.username = username;
						newUser.password = createHash(password);

            if(req.session.lastSearch) {
              newUser.location = req.session.lastSearch;
            }

            var token = generateToken(newUser.username);

					  newUser.save();
            return done(null, {user: newUser, token: token});
					}
				});
			};
			process.nextTick(findOrCreateUser);
		}
	));

}


var isValidPassword = function(user, password){
  return bcrypt.compareSync(password, user.password);
}

var createHash = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

function generateToken(user) {
  var u = {
    name: user.name
  };

  return token = jwt.sign(u, process.env.JWT_SECRET, {
    expiresIn: 60 * 60
  });
}
