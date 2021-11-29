const express = require("express")
const router = express.Router()

const shedule = require("../../../controller/shedule/shedule.controller");
const { shedul } = require("../../../models");

//Create new Event
router.post("/addEvent", shedule.create);

//Find all Event
router.post("/getEvent", shedule.findByGroup);

//Update Event
router.post("/updateEvent", shedule.updateEvent);

//Find Event by Id
router.post("/findEventById", shedule.findEventById);

module.exports = router