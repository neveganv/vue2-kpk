const express = require("express")
const router = express.Router()

const page = require("../../controller/page.controller");

//Create new page
router.post("/addPage", page.create);

//Find all page
router.post("/getAllPage", page.findAll);

module.exports = router