const express = require("express")
const router = express.Router()

const classes = require("../../../controller/shedule/class.controller");

//Create new Class
router.post("/addClass", classes.create);

//Find all Class
router.post("/getAllClass", classes.findAll);



module.exports = router