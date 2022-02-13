const db = require("../../models");
const Classes = db.classes
const guardToken = require("../../middleware/guardToken")

// Create a new optionsList
exports.create = (req, res) => {
    if(guardToken.guardToken(req,res)) return  false
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
