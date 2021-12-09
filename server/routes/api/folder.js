const express = require("express")
const router = express.Router()

const folder = require("../../controller/folder.controller");

//Create a new folder
router.post("/", folder.create);

//Find all folders
router.post("/getAll", folder.findAll);

module.exports = router