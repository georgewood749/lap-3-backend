const express = require("express");
const router = express.Router();
const gamesController = require("../controllers/games");

router.route("/").get(gamesController.getAllGames);

//todo getGameByID

module.exports = router;
