const db = require("../models");
const Shedule = db.shedule


// Create a new optionsList
exports.create = (req, res) => {
    console.log("Категорія:",req.body.name)
      const group = new Shedule({
          group: req.body.name
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
    Shedule.find()
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
