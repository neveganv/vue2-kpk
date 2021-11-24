const express = require("express")
const router = express.Router()

const position = require("../../controller/position.controller");

//Create new position
router.post("/add", position.create);

//Find all positions
router.post("/getAll", position.findAll);

module.exports = router