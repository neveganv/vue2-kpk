const express = require("express")
const router = express.Router()

const shedule = require("../../../controller/shedule/shedule.controller");

//Create new Event
router.post("/addEvent", shedule.create);

//Find all Event
router.post("/getEvent", shedule.findByGroup);



module.exports = router