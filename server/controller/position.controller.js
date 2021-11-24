const db = require("../models");
const Position = db.position


// Create a new position
exports.create = (req, res) => {
    const position = new Position({
        title: req.body.title
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
exports.findAll = (req, res) => {
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
