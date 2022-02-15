const db = require("../models");
const Position = db.position
const guardToken = require("../middleware/guardToken")


// Create a new position
exports.create = async(req, res) => {
    if(await guardToken.guardToken(req,res)) return  false

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
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the order."
            });
        });
};

// find all positions
exports.findAll = async(req, res) => {
    if(await guardToken.guardToken(req,res)) return false
    Position.find()
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
