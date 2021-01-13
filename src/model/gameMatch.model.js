const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameMatchSchema = new Schema(
	{
		gameId: { type: Number, required: true },
		player1: { type: Schema.Types.ObjectId, ref: 'User' },
		player2: { type: Schema.Types.ObjectId, ref: 'User' },
		squares: { type: String },
		winline: { type: String },
		winner: { type: Schema.Types.ObjectId, ref: 'User' },
		loser: { type: Schema.Types.ObjectId, ref: 'User' },
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('gameMatch', GameMatchSchema);
