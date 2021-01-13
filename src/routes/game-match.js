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

/* GET /game-match/:gameId */
router.get('/:gameId', getGameHistory);

module.exports = router;
