const db = require("../models");
const Page = db.page


// Create a new page
exports.create = (req, res) => {
    console.log("req",req.body);
      const page = new Page({
          name: req.body.name,
          folder: req.body.folder,
      });
   
    page
        .save(page)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the page."
            });
        });

};

exports.findAll = (req, res) => {
     Page.find()
     .populate('folder')
     .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving pages."
        });
    });
};

exports.findById = (req, res) => {  
    Page.find({_id: req.body._id})
    .populate('folder')
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving blogs."
        });
      });
  
  };