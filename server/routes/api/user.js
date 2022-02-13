const express = require("express")
const router = express.Router()

const user = require("../../controller/user.controller");
const token = require("../../middleware/checkToken")

//Create new User
router.post("/add", user.create);

//Find all News
router.post("/getAll", user.findAll);

//Find one by token
router.post("/getUser", token.checkToken, user.getUser);

//login user
router.post("/login", user.login);

//update user
router.post("/update", user.update);

//change password
router.post("/changePassword", user.changePassword);

//delete user
router.post("/deleteUser", user.deleteUser);

//find user by id
router.post("/findUserById", user.findUserById);

module.exports = router