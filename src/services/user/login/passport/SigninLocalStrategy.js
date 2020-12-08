const LocalStrategy = require('passport-local').Strategy;
const User = require('../../../../model/users.model');

const SigninLocalStatergy = new LocalStrategy(function (
	username,
	password,
	done
) {
	User.findOne({ username })
		.then((user) => {
			if (!user) return done(null, false, { message: 'User not found' });
			user
				.isValidPassword(password)
				.then((isValidated) => {
					if (!isValidated)
						return done(null, false, { message: 'Wrong Password' });
					return done(null, user, { message: 'Logged in Successfully' });
				})
				.catch((error) => done(error));
		})
		.catch((error) => done(error));
});

module.exports = SigninLocalStatergy;
