const LocalStrategy = require('passport-local').Strategy;
const User = require('../../../../model/users.model');

const GoogleStatergy = new LocalStrategy(
	{ passReqToCallback: true, usernameField: 'email', passwordField: 'email' },
	async function (req, username, password, done) {
		const user = await User.findOne({ $or: [{ 'google.email': username }, { email: username }] });
		if (user) {
			if (!user.google.email) {
				user.google.email = username;
				user.google.id = googleId;
				const newUser = await user.save();
				return done(null, newUser, 'User updated and Logged in Successfully with Google account.');
			}
			return done(null, user, 'Logged in Successfully with Google account.');
		}
		const name = req.body.fname + ' ' + req.body.lname;
		const newUser = await User.create({
			email: username,
			name,
			google: { email: username, id: req.body.googleId },
		});
		return done(null, newUser, 'User created and log in successfully with Google');
	}
);

module.exports = GoogleStatergy;
