const express = require("express")
const router = express.Router()

const prepareCourse = require("../../controller/prepareCourse.controller");

//Create new prepare course
router.post("/add", prepareCourse.create);

//Update prepare course
router.post("/update", prepareCourse.update);

//Find prepare course by id
router.post("/getPrepareCourseById", prepareCourse.findPrepareCourseById)

//Get all
router.post("/getAllPrepareCourse", prepareCourse.findAll)

//delete applications
router.post("/delete", prepareCourse.deleteApplications)

module.exports = router