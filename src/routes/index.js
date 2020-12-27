const express = require('express');
const router = express.Router();
const passport = require('../services/user/auth/passport');
const jwt = require('jsonwebtoken');
const logUser = require('../services/user/auth/logUser');

/* GET / */
router.get('/', function (req, res, next) {
	res.json('PIC DAC NOE GAME');
});

/* POST /signup */
router.post('/signup', logUser.signup);

/* POST /signin 
{
	"username": "",
	"password": ""
}
*/
router.post('/signin', logUser.signin);

router.post('/auth/google', logUser.googleAuth);

router.post('/auth/facebook', logUser.facebookAuth);

module.exports = router;
