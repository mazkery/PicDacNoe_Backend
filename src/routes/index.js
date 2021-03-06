const express = require('express');
const router = express.Router();
const logUser = require('../services/user/auth/logUser');
const verifyToken = require('../services/user/auth/verifyToken');
const User = require('../model/users.model');

/* GET / */
router.get('/', function (req, res, next) {
	res.json('PIC DAC NOE GAME');
});

/**
 * POST /signup 
{
	"email": "...",
	"fname": "...",
	"lname": "...",
	"password": "..."
}
SUCESS
res.header({ token: token });
res.json({
	message: info,
	user: {
		id: user._id,
		name: user.name,
		token,
	},
}
FAILED
res.status(500).json({
	message: info || 'Signup Error',
});
 */

router.post('/signup', logUser.signup);

/**
 * POST /signin 
{
	"email": "...",
	"password": "..."
}
SUCCES
res.header({ token: token });
return res.json({
	info,
	user: {
		id: user._id,
		name: user.name,
		token,
	},
});
FAILED
res.status(500).json({
	message: info || 'Signin Error',
});
 */
router.post('/signin', logUser.signin);

/**
 * POST /auth/google
 {
	 "email": "...@gmail.com",
	 "googleId": "...",
	 "fname": "...",
	 "lname": "..."
 }
 SUCCESS
 res.header({ token: token });
 res.json({
		info,
		user: {
			id: user._id,
			name: user.name,
			token,
		},
	});
	FAILED
 res.status(500).json({
		message: info || 'Google Auth Error',
	});
 */

router.post('/auth/google', logUser.googleAuth);

/**
 * POST /auth/google
 {
	 "email": "...@...",
	 "facebookId": "...",
	 "fname": "...",
	 "lname": "..."
 }
SUCCESS
 res.header({ token: token });
 res.json({
		info,
		user: {
			id: user._id,
			name: user.name,
			token,
		},
	});
FAILED
 res.status(500).json({
		message: info || 'Google Auth Error',
	});
 */

router.post('/auth/facebook', logUser.facebookAuth);

/**
 * GET /verify
 * attach token to header
SUCCESS
 res.json({
		message: info,
	});
FAILED
res.status(500).json({
		message: info || 'Verify Error',
});
 */

router.get('/verify', verifyToken.verifyUser);

/** GET /verify-admin
 * Verify admin
 * attach token to header
SUCCESS
res.json({
		message: info,
});
FAILED
res.status(500).json({
		message: info || 'Verify Error',
});
 */

router.get('/verify-admin', verifyToken.verifyAdmin);

/**
 * GET /user-profile
 * attach token to header
 * SUCCESS
 * res.json({
 * 		message: 'Successfully get user profile.',
 * 		user: req.user,
 * });
 * FAILED
 *	Unauthorized
 */

router.get('/user-profile', verifyToken.authenticateUser, (req, res, next) => {
	res.json({
		message: 'Successfully get user profile.',
		user: req.user,
	});
});

/**
 * Forget password
 * POST /forget-password
 * 	{
			"id": ...,
			"password": ....,
		}
 */
router.post('/forget-password', async (req, res, next) => {
	const user = await User.findById(req.body.id);
	if (!user) res.status(500).json({ message: 'User not found.' });
	else {
		user.password = req.body.password;
		user
			.save()
			.then((savedUser) => res.json({ message: 'Password updated.', user: savedUser }))
			.catch((error) => res.status(500).json({ message: error.message }));
	}
});

/**
 * GET /top-10-player
 */
router.get('/top-10-player', (req, res, next) => {
	User.find()
		.sort({ 'game.win': 'desc' })
		.limit(10)
		.exec((err, users) => {
			if (err) res.status(500).json({ message: err.message });
			else {
				res.json({ message: 'Top 10 players.', count: users.length, users });
			}
		});
});

module.exports = router;
