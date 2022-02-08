const express = require("express")
const router = express.Router()

const collegePhoto = require("../../controller/collegePhoto.controller");

//Find all
router.post("/", collegePhoto.findAll)

//New photo
router.post("/createPhoto", collegePhoto.create);

//Delete photo
router.delete("/deletePhoto", collegePhoto.delete);

module.exports = router