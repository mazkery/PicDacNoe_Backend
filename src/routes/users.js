const express = require('express');
const router = express.Router();
const User = require('../model/users.model');

/* GET users listing. 
	{
		"email": ...
	}
*/
router.get('/profile', async function (req, res, next) {
	const email = req.body.email;
	const user = User.findOne({ email });
	if (!user) return res.status(500).json({ message: 'Cannot found user.' });
	return res.json({ message: 'Found user successfully.', user });
});

module.exports = router;
