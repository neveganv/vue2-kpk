const express = require("express")
const router = express.Router()

const prepareCourse = require("../../controller/prepareCourse.controller");

//Create new prepare course
router.post("/add", prepareCourse.create);

//Update prepare course
router.post("/update", prepareCourse.update);

//Find prepare course by id
router.post("/getNewsById", news.findPrepareCourseById)

module.exports = router