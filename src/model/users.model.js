const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema(
	{
		username: {
			type: String,
			unique: true,
			trim: true,
			lowercase: true,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('User', userSchema);
