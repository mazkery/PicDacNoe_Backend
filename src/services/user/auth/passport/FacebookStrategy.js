const LocalStrategy = require('passport-local').Strategy;
const User = require('../../../../model/users.model');

const FacebookStatergy = new LocalStrategy(
	{
		usernameField: 'email',
		passwordField: 'email',
	},
	function (username, password, done) {
		User.findOne({ 'facebook.email': username })
			.then((user) => {
				if (!user) {
					User.findOne({ username })
						.then((user) => {
							if (!user) {
								User.create({ username, facebook: { email: username } }).then(
									(user) => {
										return done(null, user, {
											message: 'User created and login with Facebook account.',
										});
									}
								);
							} else {
								user.facebook.email = username;
								user
									.save()
									.then((user) =>
										done(null, user, {
											message: 'User updated and login with Facebook account.',
										})
									)
									.catch((error) => done(error, false, error.message));
							}
						})
						.catch((error) => done(error, false, error.message));
				} else {
					return done(null, user, {
						message: 'Logged in Successfully with Facebook account.',
					});
				}
			})
			.catch((error) => done(error, false, error.message));
	}
);

module.exports = FacebookStatergy;
