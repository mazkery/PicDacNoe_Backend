const express = require('express');
const router = express.Router();
const User = require('../model/users.model');

/* GET users listing. 
	{
		"email": ...
	}
*/
router.post('/profile', function (req, res, next) {
	const email = req.body.email;
	User.findOne({ email })
		.then((user) => {
			if (!user) return res.status(500).json({ message: 'Cannot found user.' });
			return res.json({ message: 'Found user successfully.', user });
		})
		.catch((error) => res.status(500).json({ message: error.message }));
});

module.exports = router;
