const LocalStrategy = require('passport-local').Strategy;
const User = require('../../../../model/users.model');

const FacebookStatergy = new LocalStrategy(
	{ passReqToCallback: true, usernameField: 'email', passwordField: 'email' },
	async function (req, username, password, done) {
		const user = await User.findOne({ 'facebook.email': username });
		if (user) {
			if (!user.facebook.email) {
				user.facebook.email = username;
				user.facebook.id = facebookId;
				const newUser = await user.save();
				return done(
					null,
					newUser,
					'User updated and Logged in Successfully with Facebook account.'
				);
			}
			return done(null, user, 'Logged in Successfully with Facebook account.');
		}
		const name = req.body.fname + ' ' + req.body.lname;
		const newUser = await User.create({
			email: username,
			name,
			facebook: { email: username, id: req.body.facebookId },
		});
		return done(null, newUser, 'User created and log in successfully with facebook');
	}
);

module.exports = FacebookStatergy;
