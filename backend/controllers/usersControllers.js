const User = require('../models/usersModel.js');
const bcrypt = require('bcryptjs');

const SigUpNewUser = async (req, res) => {
	const { username, password, telefon } = req.body;
	try {
		if (!username || !password || !telefon) {
			return res
				.status(404)
				.json({ error: 'All fields must be filled' });
		}

		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(password, salt);

		await User.create({
			username,
			password: hash,
			telefon,
		});

		res.status(200);
	} catch (error) {
		res.status(300).json({ error: error.message });
	}
};

module.exports = {
	SigUpNewUser,
};
