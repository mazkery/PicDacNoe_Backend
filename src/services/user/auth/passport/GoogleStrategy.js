const LocalStrategy = require('passport-local').Strategy;
const User = require('../../../../model/users.model');

const GoogleStatergy = new LocalStrategy(
	{
		usernameField: 'email',
		passwordField: 'email',
	},
	function (username, password, done) {
		User.findOne({ 'google.email': username })
			.then((user) => {
				if (!user) {
					User.findOne({ username })
						.then((user) => {
							if (!user) {
								User.create({ username, google: { email: username } }).then(
									(user) => {
										return done(null, user, {
											message: 'User created and login with Google account.',
										});
									}
								);
							} else {
								user.google.email = username;
								user
									.save()
									.then((user) =>
										done(null, user, {
											message: 'User updated and login with Google account.',
										})
									)
									.catch((error) => done(error, false, error.message));
							}
						})
						.catch((error) => done(error, false, error.message));
				} else {
					return done(null, user, {
						message: 'Logged in Successfully with Google account.',
					});
				}
			})
			.catch((error) => done(error, false, error.message));
	}
);

module.exports = GoogleStatergy;
