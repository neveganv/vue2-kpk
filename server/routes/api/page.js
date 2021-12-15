const express = require("express")
const router = express.Router()

const page = require("../../controller/page.controller");

//Create new page
router.post("/addPage", page.create);

//Find all page
router.post("/getAllPage", page.findAll);

//Find by value
router.post("/getById", page.findById);

//delete a page by id
router.delete("/:id", page.delete);

//update a page
router.put("/:id", page.update);

module.exports = router