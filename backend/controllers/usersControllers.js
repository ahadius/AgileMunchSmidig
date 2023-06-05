const User = require('../models/users.js');

const saveUser = async (req, res) => {
	const { image } = req.body;
	try {
		const newUser = await User.create({
			image,
		});
		res.status(200).json(newUser);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const getUser = async (req, res) => {
	const json = await User.find({}).sort({});
	res.status(200).json(json);
};
module.exports = {
	getUser,
	saveUser,
};
