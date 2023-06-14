const Image = require('../models/productModel.js');

const saveImage = async (req, res) => {
	const { base64 } = req.body;
	console.log(base64);
	try {
		const imges = Image.create({ image: base64 });
		res.json({ Status: imges });
	} catch (error) {
		res.json({ Status: 'error', error });
	}
};

const getImage = async (req, res) => {
	const json = await Image.find();
	res.status(200).json(json);
};
const getImageById = async (req, res) => {
	const project = await Image.findById(req.params.id);

	if (project) {
		res.json(project);
	} else {
		res.status(404);
		throw new Error('Project not found');
	}
};
module.exports = {
	getImage,
	getImageById,
	saveImage,
};
