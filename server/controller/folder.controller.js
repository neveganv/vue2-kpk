const db = require("../models");
const Folder = db.folder
const Page = db.page

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

exports.findById = (req, res) => {
    Page.find({ _id: req.body._id })
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

// Update a folder by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    const id = req.params.id;

    Folder.findOne({_id: id})
        .then(data => {
            data.positions = []
            for (i = 0; i < req.body.positions.length; i++) {
                data.positions.push(req.body.positions[i])
            }
            data.name = req.body.name
            data.save(data).then(() => { res.send({ message: "Folder was updated successfully." }); })
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Folder with id=" + id
            });
        });
};

// Delete a folder by id
exports.delete = (req, res) => {
    const id = req.params.id;

    Page.deleteOne({ folder: id }).then(() => {
        Folder.findByIdAndRemove(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({
                        message: `Cannot delete folder with id=${id}. Maybe folder was not found!`
                    });
                } else {
                    res.send({
                        message: "Folder was deleted successfully!"
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Could not delete fodler with id=" + id
                });
            });
    })

};