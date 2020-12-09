const passport = require('passport');
const User = require('../../../../model/users.model');

// import strategies
const SigninLocalStrategy = require('./SigninLocalStrategy');
const SignupLocalStrategy = require('./SignupLocalStrategy');
const VerifyJwtStrategy = require('./VerifyJwtStrategy');
const VerifyAdminJwtStrategy = require('./VerifyAdminJwtStrategy');
const GoogleStrategy = require('./GoogleStrategy');
const FacebookStrategy = require('./FacebookStrategy');

passport.serializeUser(function (user, done) {
	done(null, user._id);
});
passport.deserializeUser(function (id, done) {
	User.findById(id, function (err, user) {
		done(err, user);
	});
});

passport.use('local-signin', SigninLocalStrategy);
passport.use('local-signup', SignupLocalStrategy);
passport.use('verify-token', VerifyJwtStrategy);
passport.use('verify-admin-token', VerifyAdminJwtStrategy);
passport.use('google-login', GoogleStrategy);
passport.use('facebook-login', FacebookStrategy);

module.exports = passport;
