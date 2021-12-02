const express = require("express")
const router = express.Router()

const page = require("../../controller/specialty.controller");

//Create new page
router.post("/addSpecialty", page.create);

//Find all page
router.post("/getAllSpecialty", page.findAll);

module.exports = router