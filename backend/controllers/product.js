const Product = require('../models/productModel.js');

const saveProduct = async (req, res) => {
	const { image } = req.body;
	try {
		const newProduct = await Food.create({
			image,
		});
		res.status(200).json(newProduct);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const getproduct = async (req, res) => {
	const json = await Product.find({}).sort({});
	res.status(200).json(json);
};
module.exports = {
	getproduct,
	saveProduct,
};
