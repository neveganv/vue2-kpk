const express = require("express")
const router = express.Router()

const optionsList = require("../../controller/optionsList.controller");

//Create new Options
router.post("/", optionsList.create);

module.exports = router