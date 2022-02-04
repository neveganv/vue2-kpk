const express = require("express")
const router = express.Router()

const partner = require("../../controller/partner.controller");

//Create new page
router.post("/addPartner", partner.create);

//Find by value
router.post("/getByIdPartner", partner.findPartnerById);

//Find all
router.post("/getAllPartner", partner.findAll)

//delete a partner by id
router.delete("/deletePartner/:id", partner.deletePartner);

//update a partner
router.put("updatePartner/:id", partner.update);

module.exports = router