const mongoose = require('mongoose');
const usersSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			require: true,
		},
		password: {
			type: String,
			require: true,
		},
	},
	{ timestamps: true }
);
const User = mongoose.model('user', usersSchema);
module.exports = {
	User,
};
