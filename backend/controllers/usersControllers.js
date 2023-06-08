const User = require('../models/usersModel.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = process.env.secret;

const GenerateToken = _id => {
	return jwt.sign({ _id, isAdmin: User.isAdmin }, secret, {
		expiresIn: '30d',
	});
};

const SigUpNewUser = async (req, res) => {
	const { name, email, password } = req.body;
	try {
		if (!name || !email || !password) {
			res.json(400);
			throw Error('All fields must be filled');
		}
		const exists = await User.findOne({ email });
		if (exists) {
			throw Error('emal is already is in use');
		}

		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(password, salt);

		const user = await User.create({
			name,
			email,
			password: hash,
		});

		const token = GenerateToken(user._id);
		console.log('hello token' + token);
		res.status(200).json({ email, token });
	} catch (error) {
		res.status(300).json({ error: error.message });
	}
};

module.exports = {
	SigUpNewUser,
};
