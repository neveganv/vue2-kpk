const express = require("express")
const router = express.Router()

const folder = require("../../controller/folder.controller");

//Create a new folder
router.post("/", folder.create);

//Find all folders
router.post("/getAll", folder.findAll);

//Find by value
router.post("/getById", folder.findById);

//delete a folder by id
router.delete("/:id", folder.delete);

//update a folder
router.put("/:id", folder.update);

module.exports = router