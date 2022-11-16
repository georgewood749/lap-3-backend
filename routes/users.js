const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users");

router.route("/").get(usersController.getAllUsers);
router.route("/").post(usersController.postUser);
router.route("/leaderboard").get(usersController.leaderboard);

//todo getByID?
//todo patchUser?

module.exports = router;
