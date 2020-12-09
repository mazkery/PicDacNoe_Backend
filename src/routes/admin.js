var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
	res.send('respond with a resource');
});

router.get('/profile', (req, res, next) => {
	res.json({
		message: 'You made it to the Admin route',
		user: req.user,
	});
});

module.exports = router;
