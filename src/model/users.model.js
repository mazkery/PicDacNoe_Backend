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
		isAdmin: {
			type: Boolean,
			default: false,
			required: true,
		},
		facebook: {
			id: String,
			// token: String,
			email: String,
			name: String,
		},
		google: {
			id: String,
			// token: String,
			email: String,
			name: String,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('User', userSchema);
