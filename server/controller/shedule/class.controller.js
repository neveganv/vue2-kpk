const db = require("../../models");
const Classes = db.classes
const guardToken = require("../../middleware/guardToken")

// Create a new optionsList
exports.create = async(req, res) => {
    if(await guardToken.guardToken(req,res)) return  false

    let validateError = {
        status: 400,
        error: {
            type: "Validation error",
            message: "",
        }
    };
    if (!req.body.name) {
        validateError.error.message = "Name is required";
        return res.status(400).send(validateError);
    }
    else if (!req.body.color) {
        validateError.error.message = "Color is required";
        return res.status(400).send(validateError);
    }

      const classes = new Classes({
          name: req.body.name,
          color: req.body.color
      });

    // Save Classes in the database
    classes
        .save(classes)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the classes."
            });
        });

};

exports.findAll = (req,res) => {
    Classes.find()
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
