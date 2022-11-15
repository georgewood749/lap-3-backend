const User = require("../models/user");

const getAllUsers = async (req, res) => {
	try {
		const users = await User.all;
		res.status(200).json({ users });
	} catch (err) {
		res.status(500).json({ msg: err.message });
	}
};

const leaderboard = async (req, res) => {
	try {
		const users = await User.sortByScore();
		res.status(200).json({ users });
	} catch (err) {
		res.status(500).json({ msg: err.message });
	}
}

module.exports = { getAllUsers, leaderboard };
