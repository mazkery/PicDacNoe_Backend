const express = require('express');
const router = express.Router();
const { saveGameMatchAndResult, getGameHistory } = require('../services/GameMatch');
const GameMatch = require('../model/gameMatch.model');

/**
 * GET /game-match/all
 */
router.get('/all', function (req, res, next) {
	GameMatch.find({}, (err, gameMatches) => {
		if (err) res.status(500).json({ message: err.message });
		else {
			res.json({ message: 'Fetch all Game Match.', count: gameMatches.length, users: gameMatches });
		}
	});
});

/**
 * POST /game-match/save
 * {
 *  "player1": user.id,
 *  "player2": user.id,
 * 	"gameId": "",
 *  "squares": "",
 *  "winline": "",
 * 	"winner": user.id,
 * }
 * */
router.post('/save', saveGameMatchAndResult);

/**
 * POST /game-match/history 
 * {
 * 	"gameId"
 * }
 * 
 * GAMEMATCH MODEL
 { gameId: { type: Number, required: true },
	player1: { type: Schema.Types.ObjectId, ref: 'User' },
	player2: { type: Schema.Types.ObjectId, ref: 'User' },
	squares: { type: String },
	winline: { type: String },
	winner: { type: Schema.Types.ObjectId, ref: 'User' },
	loser: { type: Schema.Types.ObjectId, ref: 'User' },}
 * 
 *  */
router.post('/history ', getGameHistory);

module.exports = router;
