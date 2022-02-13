const express = require("express")
const router = express.Router()

const newsCategory = require("../../controller/newsCategory.controller");

//Create new NewsCategory
router.post("/addCategory", newsCategory.create);

//Find all NewsCategory
router.post("/getAll", newsCategory.findAll);

module.exports = router