const express = require("express")
const router = express.Router()

const classes = require("../../controller/class.controller");

//Create new Class
router.post("/addClass", classes.create);

//Find all Class
router.post("/getAll", classes.findAll);



module.exports = router