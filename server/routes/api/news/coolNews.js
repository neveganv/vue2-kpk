const express = require("express")
const router = express.Router()

const coolNews = require("../../../controller/news/coolNews.controller");

//Create new news
router.post("/addCoolNews", coolNews.create);

//Find all news
router.get("/getAllCoolNews", coolNews.findAll);

//Find news by id
router.get("/getCoolNewsById", coolNews.findCoolNewsById)

//Update news
router.post("/updateCoolNews", coolNews.updateCoolNews);

//Delete news 
router.post("/deleteCoolNews", coolNews.deleteCoolNews);

//findByStatus
router.get("/findByStatus", coolNews.findByStatus);

module.exports = router