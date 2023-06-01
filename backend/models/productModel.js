const mongoose = require('mongoose');
const productSchema = new mongoose.Schema(
	{
		image: {
			type: String,
			require: true,
		},
	},
	{ timestamps: true }
);
const product = mongoose.model('product', productSchema);
module.exports = {
	product,
};
