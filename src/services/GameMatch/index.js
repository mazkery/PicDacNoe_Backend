const User = require('../../model/users.model');
const GameMatch = require('../../model/gameMatch.model');

/**
 *
 * {
 *  "player1": user.id,
 *  "player2": user.id,
 * 	"gameId": "",
 *  "squares": "",
 *  "winline": "",
 * 	"winner": user.id,
 * }
 */
exports.saveGameMatchAndResult = async function (req, res, next) {
	const gameMatch = await GameMatch.findOne({ gameId });
	if (gameMatch) {
		return res.json({ message: 'Match history save.', gamematch });
	}
	const player1Id = req.body.player1;
	const player2Id = req.body.player2;
	const gameId = req.body.gameId;
	const squares = req.body.squares;
	const winline = req.body.winline;
	const player1 = await User.findById(player1Id);
	if (!player1) return res.status(500).json({ message: 'Invaid Player 1 id.' });
	const player2 = await User.findById(player2Id);
	if (!player2) return res.status(500).json({ message: 'Invalid Player 2 id' });
	const newGameMatch = await GameMatch.create({ gameId, player1, player2, squares, winline });
	if (newGameMatch.player1 === winnerId) {
		newGameMatch.winner = winnerId;
		newGameMatch.loser = newGameMatch.player2;
		player1.game.win += 1;
		player2.game.lose += 1;
	} else if (newGameMatch.player2 === winnerId) {
		newGameMatch.winner = winnerId;
		newGameMatch.loser = newGameMatch.player1;
		player2.game.win += 1;
		player1.game.lose += 1;
	} else {
		// a draw
		player2.game.draw += 1;
		player1.game.draw += 1;
	}
	player1.game.total += 1;
	player1.game.matches.push(this);
	player2.game.total += 1;
	player2.game.matches.push(this);
	await player1.save();
	await player2.save();
	return res.json({ message: 'Match history save.', gamematch: newGameMatch });
};

/**
 * /game-match/:gameId
 * */
exports.getGameHistory = async function (req, res, next) {
	const gameMatch = await GameMatch.findOne({ gameId: req.params.gameId }).exec();
	if (!GameMatch) return res.status(500).json({ message: 'Game match not found.' });
	return res.json({ message: 'Fetch Game History', gameMatch });
};
