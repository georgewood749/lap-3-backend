const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users");

router.route("/").get(usersController.getAllUsers);

//todo postUser

//todo getByID?
//todo patchUser?

//todo Leaderboard
router.route("/leaderboard").get(usersController.leaderboard);

module.exports = router;
