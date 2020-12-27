const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const userSchema = new Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String },
		isAdmin: { type: Boolean, default: false, required: true },
		facebook: { id: String, email: String },
		google: { id: String, email: String },
	},
	{
		timestamps: true,
	}
);

userSchema.pre('save', async function (next) {
	if (this.password) {
		const hash = await bcrypt.hash(this.password, 10);
		this.password = hash;
	}
	next();
});

userSchema.methods.isValidPassword = async function (password) {
	const user = this;
	const compare = await bcrypt.compare(password, user.password);
	return compare;
};

module.exports = mongoose.model('User', userSchema);
