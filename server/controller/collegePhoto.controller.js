const db = require('../models');
const collegePhoto = require('../models/collegePhoto');
const CollegePhoto = db.collegePhoto;
const guardToken = require("../middleware/guardToken")

// find all
exports.findAll = (req, res) => {
  CollegePhoto.find({})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: 'Some error occurred while retrieving college photo.',
      });
    });
};

exports.create = (req, res) => {
  if (guardToken.guardToken(req, res)) return false

  if (!req.body.img) {
    return res.status(400).send({
      status: 400,
      error: {
        type: "Validation error",
        message: "Img is required"
      }
    });
  }

  const collegePhoto = new CollegePhoto({
    img: req.body.img
  });
  collegePhoto
    .save(collegePhoto)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the college photo.',
      });
    });
};

exports.delete = (req, res) => {
  if (guardToken.guardToken(req, res)) return false

  const id = req.body.id;

  CollegePhoto.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete college photo with id=${id}.`
        });
      } else {
        res.send({
          message: "College photo was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete college photo with id=" + id
      });
    });

};