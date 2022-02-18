const db = require("../models");
const Specialty = db.specialty
const guardToken = require("../middleware/guardToken")
const code = require('../generator/passwordGenerator');
const uploadImage = require('../uploader/uploader');
const api_end_point = process.env.API_ENDPOINT;


let response = {
  status: 200,
  result: null,
  message: null,
  length: 0
}


// Create a new specialty
exports.create = async (req, res) => {
  if (await guardToken.guardToken(req, res)) return false

  let validateError = {
    status: 400,
    error: {
      type: "Validation error",
      message: "",
    }
  };
  if (!req.body) {
    validateError.error.message = "Data to update can not be empty!";
    return res.status(400).send(validateError);
  }
  if (!req.body.name) {
    validateError.error.message = "Name is required";
    return res.status(400).send(validateError);
  }
  if (!req.body.img) {
    validateError.error.message = "Image is required";
    return res.status(400).send(validateError);
  }

  let name = "speciality-" + code.generate() + '.jpg';
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

  const specialty = new Specialty({
    name: req.body.name,
    img: api_end_point + '/uploads/' + name,
    content: req.body.content,
    courses: req.body.courses,
    number: req.body.number
  });

  specialty
    .save(specialty)
    .then(data => {
      response.length = 1;
      response.result = data;
      response.message = "Success create specialty"
      res.send(response);
    })
    .catch(err => {
      response.status = 500;
      response.message = "Some error occurred while creating the specialty.";
      response.error.type = "";
      response.error.message = err.message || "Some error occurred while creating the specialty.";
      res.status(response.status).send(response);
    });

};

exports.findAll = (req, res) => {
  Specialty.find()
    .then(data => {
      response.length = data.length;
      response.result = data;
      response.message = "Success get all specialtys"
      res.send(response);
    })
    .catch(err => {
      response.status = 500;
      response.message = "Some error occurred while retrieving specialty.";
      response.error.type = "";
      response.error.message = err.message || "Some error occurred while retrieving specialty.";
      res.status(response.status).send(response);
    });
};
exports.findById = (req, res) => {

  Specialty.find({ _id: req.body.id })
    .then(data => {
      response.length = 1;
      response.result = data[0];
      response.message = "Success find specialty"
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving specialty"
      });
    });

};

exports.update = async (req, res) => {
  if (await guardToken.guardToken(req, res)) return false
  let validateError = {
    status: 400,
    error: {
      type: "Validation error",
      message: "",
    }
  };

  if (!req.body) {
    validateError.error.message = "Data to update can not be empty!";
    return res.status(400).send(validateError);
  }
  if (!req.body.name) {
    validateError.error.message = "Name is required";
    return res.status(400).send(validateError);
  }
  if (!req.body.img) {
    validateError.error.message = "Image is required";
    return res.status(400).send(validateError);
  }
  const id = req.body.id;

  if (req.body.img && !req.body.img.startsWith(req.protocol + '://' + req.get('host') + '/uploads/')) {
    let name = "speciality-" + code.generate() + '.jpg';
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
    req.body.img = api_end_point + '/uploads/' + name

    Specialty.findOne({ _id: id }).select('img').then(image => {
      uploadImage.deleteFile(image.img)
    })
  }

  Specialty.findByIdAndUpdate(
    id,
    {
      name: req.body.name,
      img: req.body.img,
      number: req.body.number,
      content: req.body.content,
      courses: req.body.courses
    },
    { useFindAndModify: false }
  )
    .then(data => {
      if (!data) {
        response.status = 404;
        response.error.type = "Invalid data";
        response.error.message = `Cannot update specialty with id=${id}.`;
        response.message = "Invalid data"
        return res.status(response.status).send(response);
      } else {
        response.length = 1;
        response.message = "Specialty was updated successfully.";
        response.result = data;
        res.send(response);
      }
    })
    .catch(err => {
      response.status = 500;
      response.error.type = "Invalid data";
      response.error.message = `Error updating specialty with id=${id}.`;
      response.message = "Invalid data"
      return res.status(response.status).send(response);
    });
}

exports.findSpecialty = (req, res) => {

  Specialty.find({
    name: { $regex: new RegExp(`${req.body.title}`, "i") }
  })
    .then(data => {
      response.length = data.lenght;
      response.message = "Success search specialty";
      response.result = data;
      res.send(response);
    })
    .catch(err => {
      response.status = 500;
      response.message = "Some error occurred while search the specialty.";
      response.error.type = "";
      response.error.message = "Не вдалось отримати спеціальність.";
      res.status(response.status).send(response);
    });
};

exports.deleteSpecialty = async (req, res) => {
  if (await guardToken.guardToken(req, res)) return false

  const id = req.body.id;

  Specialty.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        response.message = `Cannot delete specialty with id=${id}.`
        response.status = 404
        response.error.type = "Invalid id"
        response.error.message = `Cannot delete specialty with id=${id}.`
        res.status(response.status).send(response);
      } else {
        uploadImage.deleteFile(data.img)
        response.message = "Partner was deleted successfully!"
        res.send(response);
      }
    })
    .catch(err => {
      response.message = `Could not delete specialty with id=${id}`
      response.status = 500
      response.error.type = "Invalid id"
      response.error.message = `Could not delete specialty with id=${id}`
      res.status(response.status).send(response);
    });
}