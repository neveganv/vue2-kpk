const db = require("../../models");
const Group = db.group
const guardToken = require("../../middleware/guardToken")

// Create a new optionsList
exports.createGroup = (req, res) => {
    if(guardToken.guardToken(req,res)) return  false
      const group = new Group({
          name: req.body.name
      });

    // Save optionsList in the database
    group
        .save(group)
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

exports.findAll = (req,res) => {
    Group.find()
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
