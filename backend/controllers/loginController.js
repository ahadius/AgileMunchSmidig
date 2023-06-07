const User = require('../models/usersModel.js');
const loginUser = async (req, res) => {
	const { username, password } = req.body;
	try {
		const user = await User.findOne({ username });
		const match = await bcrypt.compare(
			password,
			user.password
		);
		if (!match) {
			throw Error('incorrect password or telefone');
		}
		return user;
	} catch (error) {
		res.status(300).json({ error: error.message });
	}
};
module.exports = {
	loginUser,
};
