const db = require('../models');
const collegePhoto = require('../models/collegePhoto');
const CollegePhoto = db.collegePhoto;
const guardToken = require("../middleware/guardToken")
const code = require('../generator/passwordGenerator');
const uploadImage = require('../uploader/uploader');

// find all
exports.findAll = (req, res) => {
  CollegePhoto.find({})
    .then(data => {
      response.length = data.length;
      response.message = "Success find all colleg photo";
      response.result = data;
      res.send(response);
    })
    .catch(err => {
      response.status = 500;
      response.message = "Some error occurred while retrieving college photo."
      response.errors.type = "Type"
      response.errors.message = "Some error occurred while retrieving college photo."
      return res.status(response.status).send(response);
    });
};

exports.create = async (req, res) => {
  if (await guardToken.guardToken(req, res)) return false

  if (!req.body.img) {
    return res.status(400).send({
      status: 400,
      error: {
        type: "Validation error",
        message: "Img is required"
      }
    });
  }


  let name = "collegePhoto-" + code.generate() + '.jpg';
  let status = uploadImage.uploadFile(name, req.body.img)
  if (status == 500) {
    return res.status(400).send({
      status: 400,
      error: {
        type: "Image error",
        message: "Error with uploading image"
      }
    });
  }

  const collegePhoto = new CollegePhoto({
    img: req.protocol + '://' + req.get('host') + '/uploads/' + name
  });
  collegePhoto
    .save(collegePhoto)
    .then(data => {
      response.length = 1;
      response.result = data;
      response.message = "Success create college photo"
      res.send(response);
    })
    .catch(err => {
      response.status = 500;
      response.message = "Some error occurred while creating the college photo.";
      response.error.type = "";
      response.error.message = err.message || "Some error occurred while creating the college photo.";
      res.status(response.status).send(response);
    });
};

exports.delete = async (req, res) => {
  if (await guardToken.guardToken(req, res)) return false

  const id = req.body.id;

  CollegePhoto.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        response.message = `Cannot delete college photo with id=${id}.`
        response.status = 404
        response.error.type = "Invalid id"
        response.error.message = `Cannot delete college photo with id=${id}.`
        res.status(response.status).send(response);
      } else {
        uploadImage.deleteFile(data.img)
        response.message = "College photo was deleted successfully!"
        res.send(response);
      }
    })
    .catch(err => {
      response.message = `Could not delete college photo with id=${id}`
      response.status = 500
      response.error.type = "Invalid id"
      response.error.message = `Could not delete college photo with id=${id}`
      res.status(response.status).send(response);
    });

};