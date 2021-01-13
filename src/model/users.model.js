const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		confirmed: { type: Boolean, default: false },
		active: { type: Boolean, default: true },
		password: { type: String },
		isAdmin: { type: Boolean, default: false, required: true },
		facebook: { id: String, email: String },
		google: { id: String, email: String },
		game: {
			win: { type: Number, default: 0 },
			lose: { type: Number, default: 0 },
			draw: { type: Number, default: 0 },
			total: { type: Number, default: 0 },
			matches: [{ type: Schema.Types.ObjectId, ref: 'GameMatch' }],
		},
	},
	{
		timestamps: true,
	}
);

userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) return next();
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
