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

//Delete news 
router.post("/deleteNews", news.deleteNews);

//Find news by id
router.post("/getNewsById", news.findNewsById)

//Counter views
router.post("/counterViews", news.counter)

//Search news
router.post("/searchNews", news.findNews);

//Find by status
router.post("/findByStatus", news.findByStatus);

module.exports = router