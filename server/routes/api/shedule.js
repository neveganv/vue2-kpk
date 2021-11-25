const express = require("express")
const router = express.Router()

const shedule = require("../../controller/shedule.controller");

//Create new Group
router.post("/addGroup", shedule.create);

//Find all group
router.post("/getAllGroup", shedule.findAll);



module.exports = router