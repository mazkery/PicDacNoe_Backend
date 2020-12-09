const LocalStrategy = require('passport-local').Strategy;
const User = require('../../../../model/users.model');

const SignupLocalStatergy = new LocalStrategy(function (
	username,
	password,
	done
) {
	User.create({ username, password })
		.then((user) => {
			return done(null, user, {
				message: 'User created and logg in successfully',
			});
		})
		.catch((error) => {
			return done(error, false, error.message);
		});
});

module.exports = SignupLocalStatergy;
