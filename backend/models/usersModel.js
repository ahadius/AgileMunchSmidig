const mongoose = require('mongoose');
const sigupSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			require: true,
		},
		password: {
			type: String,
			require: true,
		},
		telefon: {
			type: Number,
			require: true,
		},
	},
	{ timestamps: true }
);
module.exports = mongoose.model('user', sigupSchema);
