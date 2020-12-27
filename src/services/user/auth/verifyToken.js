const passport = require('./passport');

module.exports = {
	authenticateUser: passport.authenticate('verify-token'),
	authorizeAdmin: passport.authenticate('verify-admin-token'),
	verifyUser: (req, res, next) => {
		passport.authenticate('verify-token', (error, user, info) => {
			if (user)
				return res.json({
					message: info,
				});
			if (error || !user) {
				return res.status(500).json({
					message: info || 'Verify Error',
				});
			}
		});
	},
	verifyAdmin: (req, res, next) => {
		passport.authenticate('verify-admin-token', (error, user, info) => {
			if (user)
				return res.json({
					message: info,
				});
			if (error || !user) {
				return res.status(500).json({
					message: info || 'Verify Error',
				});
			}
		});
	},
};
