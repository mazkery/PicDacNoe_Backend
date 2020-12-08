var express = require('express');
var router = express.Router();
const passport = require('../services/user/login/passport');
const jwt = require('jsonwebtoken');

/* GET / */
router.get('/', function (req, res, next) {
	res.send('PIC DAC NOE GAME');
});

/* POST /signup */
router.post('/signup', (req, res, next) => {
	passport.authenticate('local-signup', (error, user, info) => {
		if (error)
			return res.status(500).json({
				message: error.message || 'Signup Error',
			});
		req.logIn(user, function (error) {
			if (error) {
				return res.status(500).json({
					message: error.message || 'Oops, something not working.',
				});
			}
			const token = jwt.sign(
				{ user: { id: user._id, username: user.username } },
				process.env.JWT_SECRET
			);
			res.header('auth-token', token);
			return res.json({
				message: 'User created and logged in.',
			});
		});
	})(req, res, next);
});

/* POST /signin */
router.post('/signin', (req, res, next) => {
	if (req.user) {
		return res.status(500).json({
			message: 'User already login.',
		});
	}
	passport.authenticate('local-signin', (error, user, info) => {
		if (error)
			return res.status(500).json({
				message: error.message || 'Signin Error',
			});

		req.logIn(user, function (error) {
			if (error) {
				return res.status(500).json({
					message: error.message || 'Oops, something not working.',
				});
			}
			const token = jwt.sign(
				{ user: { id: user._id, username: user.username } },
				process.env.JWT_SECRET
			);
			res.header('auth-token', token);
			return res.json({
				message: 'User logged in.',
			});
		});
	})(req, res, next);
});

router.get('/logout', (req, res, next) => {
	if (req.user) {
		req.session = null;
		req.logout();
		res.json({ msg: 'User logout successfully.' });
	} else {
		res.json({ msg: 'There is no user logged in.' });
	}
});

module.exports = router;
