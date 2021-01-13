const User = require('../../model/users.model');

/**
 * /user/:id
 * */
exports.userFetail = async function (req, res, next) {
	// await person.populate('stories').populate('fans').execPopulate();
	const user = await User.findById(req.params.id).populate('game.matches').execPopulate();
	user.game.matches = user.game.matches.map((match) => ({
		_id: match._id,
		gameId: match.gameId,
		isWinner: match.winner === user._id,
	}));
	return res.json({ message: 'Fetch Game History', user });
};
