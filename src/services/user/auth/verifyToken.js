const passport = require('./passport');

module.exports = {
	authenticateUser: passport.authenticate('verify-token'),
	authorizeAdmin: passport.authenticate('verify-admin-token'),
};
