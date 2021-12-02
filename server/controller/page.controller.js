const db = require("../models");
const Page = db.page


// Create a new page
exports.create = (req, res) => {
    console.log("req",req.body);
      const page = new Page({
          name: req.body.name,
          type: req.body.type,
          accessRights: req.body.accessRights
      });
   
    page
        .save(page)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the order."
            });
        });

};

exports.findAll = (req, res) => {
     Page.find()
     .populate('name')
     .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the order."
        });
    });
};