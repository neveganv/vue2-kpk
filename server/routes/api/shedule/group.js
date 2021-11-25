const express = require("express")
const router = express.Router()

const group = require("../../../controller/shedule/group.controller");

//Create new Group
router.post("/addGroup", group.createGroup);

//Find all group
router.post("/getAllGroup", group.findAll);



module.exports = router