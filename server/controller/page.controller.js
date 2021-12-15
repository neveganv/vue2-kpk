const db = require("../models");
const Page = db.page


// Create a new page
exports.create = (req, res) => {
    console.log("req", req.body);
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
    Page.find({ _id: req.body._id })
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

// Update a page by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Page.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update page with id=${id}.`
                });
            } else res.send({ message: "Page was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Page with id=" + id
            });
        });
};

// Delete a page by id
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Page.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete page with id=${id}. Maybe Page was not found!`
          });
        } else {
          res.send({
            message: "Page was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete page with id=" + id
        });
      });
  
  };