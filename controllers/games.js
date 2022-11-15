const Game = require("../models/game");

const getAllGames = async (req, res) => {
	try {
		const games = await Game.all;
		res.status(200).json({ games });
	} catch (error) {
		res.status(500).json({ msg: error.message });
	}
};

module.exports = { getAllGames };
