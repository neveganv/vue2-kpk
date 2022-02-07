const express = require("express")
const router = express.Router()

const collegeInfo = require("../../controller/collegeInfo.controller");

//Find entrant info by id
router.post("/", collegeInfo.findAll)

//update a entrantInfo
router.put("/:id", collegeInfo.update);

module.exports = router