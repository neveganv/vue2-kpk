const express = require("express")
const router = express.Router()

const news = require("../../controller/news.controller");

//Create new Mews
router.post("/add", news.create);

//Find news at category
router.post("/getByCategory", news.findByCategory);

//Find all News
router.post("/getAllNews", news.findAll);

//Update news
router.post("/update", news.update);

module.exports = router