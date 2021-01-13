const express = require('express');
const router = express.Router();
const { createNewMatch, saveGameResult, getGameHistory } = require('../services/GameMatch');

/**
 * POST /game-match/save
 * {
 * 	"player1": user.id,
 *  "player2": user.id
 * }
 * */
router.post('/create', createNewMatch);

/**
 * POST /game-match/save
 * {
 * 	"gameId": "",
 *  "squares": "",
 *  "winline": "",
 * 	"winner": user.id,
 * }
 * */
router.post('/save', saveGameResult);

/* GET /gameId */
router.get('/:gameId', getGameHistory);

module.exports = router;
