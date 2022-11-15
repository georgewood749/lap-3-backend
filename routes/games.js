const express = require("express");
const router = express.Router();
const gamesController = require("../controllers/games");

router.route("/").get(gamesController.getAllGames);

module.exports = router;
