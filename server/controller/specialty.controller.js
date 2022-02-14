const db = require("../models");
const Specialty = db.specialty
const guardToken = require("../middleware/guardToken")


// Create a new specialty
exports.create = (req, res) => {
  if (guardToken.guardToken(req, res)) return false

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
  if (!req.body.content) {
    validateError.error.message = "Content is required";
    return res.status(400).send(validateError);
  }

  const specialty = new Specialty({
    name: req.body.name,
    img: req.body.img,
    content: req.body.content,
    courses: req.body.courses,
    number: req.body.number
  });

  specialty
    .save(specialty)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the specialty."
      });
    });

};

exports.findAll = (req, res) => {
  Specialty.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the specialty."
      });
    });
};
exports.findById = (req, res) => {

  Specialty.find({ _id: req.body.id })
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

exports.update = (req, res) => {
  if (guardToken.guardToken(req, res)) return false
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
  if (!req.body.content) {
    validateError.error.message = "Content is required";
    return res.status(400).send(validateError);
  }
  const id = req.body.id;
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
        res.status(404).send({
          message: `Cannot update specialty with id=${id}.`,
        });
      } else res.send({ message: 'Specialty was updated successfully.' });
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error updating specialty with id=' + id,
      });
    });
}

exports.findSpecialty = (req, res) => {

  Specialty.find({
    name: { $regex: new RegExp(`${req.body.title}`, "i") }
  })
    .then(data1 => {
      const data = data1;
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: 'Не вдалось отримати спеціальність.',
      });
    });
};

exports.deleteSpecialty = (req, res) => {
  if (guardToken.guardToken(req, res)) return false

  const id = req.body.id;

  Specialty.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete specialty with id=${id}.`
        });
      } else {
        res.send({
          message: "Specialty was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete specialty with id=" + id
      });
    });
}