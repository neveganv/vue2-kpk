const express = require("express")
const router = express.Router()

const shedule = require("../../controller/shedule.controller");

//Create new Group
router.post("/add", shedule.create);

//Find all group
router.post("/getAll", shedule.findAll);



module.exports = router