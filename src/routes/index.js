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
 */

router.post('/signup', logUser.signup);

/**
 * POST /signin 
{
	"email": "...",
	"password": "..."
}
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
 */

router.post('/auth/facebook', logUser.facebookAuth);

/**
 * Verify user
 * attach token to header
 */

router.get('/verify', verifyToken.verifyUser);

/**
 * Verify admin
 * attach token to header
 */

router.get('/verify/admin', verifyToken.verifyAdmin);

module.exports = router;
