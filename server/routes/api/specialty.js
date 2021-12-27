const express = require("express")
const router = express.Router()

const specialty = require("../../controller/specialty.controller");

//Create new specialty
router.post("/addSpecialty", specialty.create);

//Find all specialty
router.post("/getAllSpecialty", specialty.findAll);

//Update specialty
router.post("/updateSpecialty", specialty.update)

//Find by value
router.post("/getById", specialty.findById);

//Search specialty
router.post("/searchSpecialty", specialty.findSpecialty);
module.exports = router