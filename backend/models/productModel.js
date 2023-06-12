const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
	image: {
		type: String,
		require: true,
	},
});
module.exports = mongoose.model('image', productSchema);
