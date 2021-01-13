const express = require('express');
const router = express.Router();
const { saveGameMatchAndResult, getGameHistory } = require('../services/GameMatch');

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
 * GET /game-match/:gameId 
 * gameId: { type: Number, required: true },
	player1: { type: Schema.Types.ObjectId, ref: 'User' },
	player2: { type: Schema.Types.ObjectId, ref: 'User' },
	squares: { type: String },
	winline: { type: String },
	winner: { type: Schema.Types.ObjectId, ref: 'User' },
	loser: { type: Schema.Types.ObjectId, ref: 'User' },
 * 
 * 
 *  */
router.get('/:gameId', getGameHistory);

module.exports = router;
