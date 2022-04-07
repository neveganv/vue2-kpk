const express = require("express")
const router = express.Router()

const collegePhoto = require("../../controller/collegePhoto.controller");

//Find all
router.get("/", collegePhoto.findAll)

//New photo
router.post("/createPhoto", collegePhoto.create);

//Delete photo
router.post("/deletePhoto", collegePhoto.delete);

module.exports = router