const express = require("express")
const router = express.Router()

const user = require("../../controller/user.controller");

//Create new Mews
router.post("/add", user.create);

//Find all News
router.post("/getAll", user.findAll);

//login user
router.post("/login", user.login);

module.exports = router