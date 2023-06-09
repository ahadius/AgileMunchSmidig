const Product = require('../models/productModel.js');
const multer = require('multer');
const memoryStorage = multer.memoryStorage();

export const upload = multer({
	storage: memoryStorage,
});

const saveImage = async (req, res, next) => {
	try {
		const { file } = req;
		if (!file)
			throw new ErrorHandler(400, 'Image is required');

		const fileFormat = file.mimetype.split(' ')[1];
		const { base64 } = Product(fileFormat, file.buffer);

		const imageDetails = await uploadToCloudinary(
			base64,
			fileFormat
		);

		res.json({
			status: 'success',
			message: 'Upload successful',
			data: imageDetails,
		});
	} catch (error) {
		next(
			new ErrorHandler(
				error.statusCode || 500,
				error.message
			)
		);
	}
};

const getImage = async (req, res) => {
	const json = await Product.find({}).sort({});
	res.status(200).json(json);
};
module.exports = {
	getImage,
	saveImage,
	upload,
};
