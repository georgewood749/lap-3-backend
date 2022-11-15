const User = require("../models/user");

const getAllUsers = async (req, res) => {
	try {
		const users = await User.all;
		res.status(200).json({ users });
	} catch (error) {
		res.status(500).json({ msg: error.message });
	}
};

module.exports = { getAllUsers };
