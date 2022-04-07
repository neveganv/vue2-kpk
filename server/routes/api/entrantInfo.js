const express = require("express")
const router = express.Router()

const entrantInfo = require("../../controller/entrantInfo.controller");

//Find entrant info by id
router.get("/", entrantInfo.findAll)

//update a entrantInfo
router.put("/:id", entrantInfo.update);

module.exports = router