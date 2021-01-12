const express = require('express');
const router = express.Router();
const passport = require('../services/user/auth/passport');
const jwt = require('jsonwebtoken');
const logUser = require('../services/user/auth/logUser');
const verifyToken = require('../services/user/auth/verifyToken');

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
 * Verify user
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

/**
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

router.get('/verify/admin', verifyToken.verifyAdmin);

/**
 * Load user profile
 * attach token to header
SUCCESS
res.json({
		message: 'Successfully get user profile.',
		user: req.user,
});
FAILED
res.status(500).json({
		message: info || 'Verify Error',
});
 */

router.get('/user-profile', verifyToken.authenticateUser, (req, res, next) => {
	res.json({
		message: 'Successfully get user profile.',
		user: req.user,
	});
});

module.exports = router;
