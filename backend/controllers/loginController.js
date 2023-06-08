const User = require('../models/usersModel.js');
const jw = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET = 'hhfhhfhdfew424r24342oiøfnwn';

const GenerateToken = _id => {
	return jw.sign({ _id }, SECRET, { expiresIn: '10d' });
};

const loginUser = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });
		if (!user) {
			throw Error('incorrect email');
		}
		const match = await bcrypt.compare(
			password,
			user.password
		);
		if (!match) {
			throw Error('incorrect password');
		}
		const token = GenerateToken(user._id);
		res.status(200).json({ email, token });
	} catch (error) {
		res.status(300).json({ error: error.message });
	}
};

module.exports = {
	loginUser,
};
