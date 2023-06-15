const mongoose = require('mongoose');
const sigupSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			require: true,
			unique: true,
		},
		password: {
			type: String,
			require: true,
		},
	},
	{ timestamps: true }
);
module.exports = mongoose.model('user', sigupSchema);
