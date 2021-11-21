const express = require("express")
const router = express.Router()

const news = require("../../controller/news.controller");

//Create new Mews
router.post("/", news.create);

//Find all News
router.post("/getAll", news.findAll);

module.exports = router