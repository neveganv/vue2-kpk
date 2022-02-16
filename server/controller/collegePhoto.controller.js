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
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: 'Some error occurred while retrieving college photo.',
      });
    });
};

exports.create = async(req, res) => {
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
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the college photo.',
      });
    });
};

exports.delete = async(req, res) => {
  if (await guardToken.guardToken(req, res)) return false

  const id = req.body.id;

  CollegePhoto.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete college photo with id=${id}.`
        });
      } else {
        uploadImage.deleteFile(data.img)
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