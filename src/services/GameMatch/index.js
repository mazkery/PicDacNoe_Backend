const User = require('../../model/users.model');
const GameMatch = require('../../model/gameMatch.model');

/**
 * {
 * 	"player1": user.id,
 *  "player2": user.id
 * }
 * */
exports.createNewMatch = async function (req, res, next) {
	const player1Id = req.body.player1;
	const player2Id = req.body.player2;
	const player1 = await User.findById(player1Id);
	if (!player1) return res.status(500).json({ message: 'Invaid Player 1 id.' });
	const player2 = await User.findById(player2Id);
	if (!player2) return res.status(500).json({ message: 'Invalid Player 2 id' });
	const newGameMatch = await GameMatch.create(player1Id, player2Id);
	player1.game.total += 1;
	player1.game.matches.push(this);
	await player1.save();
	player2.game.total += 1;
	player2.game.matches.push(this);
	await player2.save();
	return res.json({ message: 'New match created.', gamematch: newGameMatch });
};

/**
 * {
 * 	"gameId": "",
 *  "squares": "",
 *  "winline": "",
 * 	"winner": user.id,
 * }
 * */
exports.saveGameResult = async function (req, res, next) {
	const gameMatch = await GameMatch.findOne({ gameId: req.body.gameId }).exec();
	if (!gameMatch) return res.status(500).json({ message: 'Match id not exist.' });
	const player1 = await User.findById(req.body.player1);
	const player2 = await User.findById(req.body.player2);
	const winnerId = req.body.winner;
	if (gameMatch.player1 === winnerId) {
		gameMatch.winner = winnerId;
		player1.game.win += 1;
		player2.game.lose += 1;
	} else if (gameMatch.player2 === winnerId) {
		gameMatch.winner = winnerId;
		player2.game.win += 1;
		player1.game.lose += 1;
	}
	// a draw
	else {
		player2.game.draw += 1;
		player1.game.draw += 1;
	}
	gameMatch.squares = req.body.squares;
	gameMatch.winline = req.body.winline;
	gameMatch.isActive = false;
	const updatedGameMatch = await gameMatch.save();
	return res.json({ message: 'Saved Game Result', gameMatch: updatedGameMatch });
};

/**
 * /game-match/:gameId
 * */
exports.getGameHistory = async function (req, res, next) {
	const gameMatch = await GameMatch.findOne({ gameId: req.params.gameId }).exec();
	return res.json({ message: 'Fetch Game History', gameMatch });
};
