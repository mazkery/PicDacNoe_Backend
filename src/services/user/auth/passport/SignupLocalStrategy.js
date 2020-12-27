const LocalStrategy = require('passport-local').Strategy;
const User = require('../../../../model/users.model');

const SignupLocalStatergy = new LocalStrategy(
	{ passReqToCallback: true, usernameField: 'email', passwordField: 'password' },
	async function (req, username, password, done) {
		const user = await User.findOne({ email: username });
		if (user) return done(null, false, 'Email already existed.');
		const name = req.body.fname + ' ' + req.body.lname;
		const newUser = await User.create({ email: req.body.email, name, password });
		return done(null, newUser, 'User created and log in successfully');
	}
);

module.exports = SignupLocalStatergy;
