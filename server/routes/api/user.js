const express = require("express")
const router = express.Router()

const user = require("../../controller/user.controller");

//Create new Mews
router.post("/add", user.create);

//Find all News
router.post("/getAll", user.findAll);

//login user
router.post("/login", user.login);

//update user
router.post("/update", user.update);

//change password
router.post("/changePassword", user.changePassword)

module.exports = router