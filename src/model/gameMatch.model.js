const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;
const User = require('./users.model');

const GameMatchSchema = new Schema(
	{
		gameId: { type: Number, required: true },
		player1: { type: Schema.Types.ObjectId, ref: 'User' },
		player2: { type: Schema.Types.ObjectId, ref: 'User' },
		squares: { type: String },
		winline: { type: String },
		winner: { type: Schema.Types.ObjectId, ref: 'User' },
		isActive: { type: Boolean, default: true },
	},
	{
		timestamps: true,
	}
);
GameMatchSchema.plugin(AutoIncrement, { inc_field: 'gameId' });

module.exports = mongoose.model('gameMatch', GameMatchSchema);
