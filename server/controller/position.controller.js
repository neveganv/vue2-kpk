const db = require("../models");
const Position = db.position
const guardToken = require("../middleware/guardToken")

let response = {
  status: 200,
  result: null,
  message: null,
  length: 0
}
 
// Create a new position
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
    validateError.error.message = "Data to create can not be empty!";
    return res.status(400).send(validateError);
  }
  if (!req.body.title) {
    validateError.error.message = "Title is required";
    return res.status(400).send(validateError);
  }
  if (!req.body.type) {
    validateError.error.message = "Type is required";
    return res.status(400).send(validateError);
  }

  const position = new Position({
    title: req.body.title,
    type: req.body.type,
  });
  position
    .save(position)
    .then(data => {
      response.length = 1;
      response.result = data;
      response.message = "Success create position"
      res.send(response);
    })
    .catch(err => {
      response.status = 500;
      response.message = "Some error occurred while creating the positon.";
      response.error.type = "";
      response.error.message = err.message || "Some error occurred while creating the position.";
      res.status(response.status).send(response);
    });
};

// find all positions
exports.findAll = async (req, res) => {
  if (await guardToken.guardToken(req, res)) return false
  Position.find()
    .then(data => {
      response.length = data.length;
      response.result = data;
      response.message = "Success get all positions"
      res.send(response);
    })
    .catch(err => {
      response.status = 500;
      response.message = "Some error occurred while retrieving positions";
      response.error.type = "";
      response.error.message = err.message || "Some error occurred while retrieving positions.";
      res.status(response.status).send(response);
    });
};
