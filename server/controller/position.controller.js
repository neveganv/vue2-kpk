const db = require("../models");
const Position = db.position
const guardToken = require("../middleware/guardToken")


// Create a new position
exports.create = (req, res) => {
    if(guardToken.guardToken(req,res)) return  false
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
exports.findAll = (req, res) => {
    if(guardToken.guardToken(req,res)) return false
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
