const express = require("express")
const router = express.Router()

const newsCategory = require("../../controller/newsCategory.controller");

//Create new Mews
router.post("/addCategory", newsCategory.create);

//Find all News
router.post("/getAll", newsCategory.findAll);

module.exports = router