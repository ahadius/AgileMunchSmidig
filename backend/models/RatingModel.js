const mongoose = require('mongoose');
const RatingSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			require: true,
		},
		password: {
			type: String,
			require: true,
			unique: true,
		},
		telefone: {
			type: String,
			require: true,
		},
	},
	{ timestamps: true }
);
module.exports = mongoose.model('Rating', RatingSchema);
