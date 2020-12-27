const LocalStrategy = require('passport-local').Strategy;
const User = require('../../../../model/users.model');

const SigninLocalStatergy = new LocalStrategy(
	{ usernameField: 'email', passwordField: 'password' },
	async function (username, password, done) {
		const user = await User.findOne({ email: username });
		if (!user) return done(null, false, 'User not found');
		const isValidated = await user.isValidPassword(password);
		if (!isValidated) return done(null, false, 'Wrong Password');
		return done(null, user, 'Logged in Successfully');
	}
);

module.exports = SigninLocalStatergy;
