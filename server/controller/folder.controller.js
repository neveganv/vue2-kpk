const db = require("../models");
const Folder = db.folder


// Create a new page
exports.create = (req, res) => {
    const folder = new Folder({
        name: req.body.name,
    });

    for (i = 0; i < req.body.positions.length; i++) {
        folder.positions.push(req.body.positions[i])
    }

    folder
        .save(folder)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the folder."
            });
        });

};

// find all pages
exports.findAll = (req, res) => {
    Folder.find()
        .populate('positions')
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving folders."
            });
        });
};