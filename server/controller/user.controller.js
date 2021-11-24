const db = require("../models");
const User = db.user


// Create a new optionsList
exports.create = (req, res) => {
      const user = new User({
          type: req.body.type,
          name: req.body.name,
          surname: req.body.surname,
          email: req.body.email,
          phone: req.body.phone,
          position: req.body.position
      });
    user
        .save(user)
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
    User.find().populate('position')
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
