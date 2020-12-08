const LocalStrategy = require('passport-local').Strategy;
const User = require('../../../../model/users.model');

const SignupLocalStatergy = new LocalStrategy(async function (
	username,
	password,
	done
) {
	User.create({ username, password })
		.then((user) => {
			return done(null, user);
		})
		.catch((error) => {
			return done(error);
		});
});

module.exports = SignupLocalStatergy;
