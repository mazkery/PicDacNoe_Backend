const passport = require('passport');
const User = require('../../../../model/users.model');

// import strategies
const SigninLocalStatergy = require('./SigninLocalStrategy');
const SignupLocalStatergy = require('./SignupLocalStrategy');

passport.serializeUser(function (user, done) {
	done(null, user.id);
});
passport.deserializeUser(function (id, done) {
	User.findById(id, function (err, user) {
		done(err, user);
	});
});
passport.use('local-signin', SigninLocalStatergy);
passport.use('local-signup', SignupLocalStatergy);

module.exports = passport;
