const express = require("express")
const router = express.Router()

const coolNews = require("../../../controller/news/coolNews.controller");

//Create new news
router.post("/addCoolNews", coolNews.create);

//Find all news
router.post("/getAllCoolNews", coolNews.findAll);

//Find news by id
router.post("/getCoolNewsById", coolNews.findCoolNewsById)

//Update news
router.post("/updateCoolNews", coolNews.updateCoolNews);

//Delete news 
router.post("/deleteCoolNews", coolNews.deleteCoolNews);

//Search news
router.post("/searchNews", coolNews.findCoolNews);


module.exports = router