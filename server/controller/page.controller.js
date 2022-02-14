const db = require("../models");
const Page = db.page
const guardToken = require("../middleware/guardToken")

// Create a new page
exports.create = (req, res) => {
    if (guardToken.guardToken(req, res)) return false
    if (!req.body.name) {
        return res.status(400).send({
            status: 400,
            error: {
                type: "Validation error",
                message: "Name is required"
            }
        });
    }

    const page = new Page({
        name: req.body.name,
        folder: req.body.folder,
    });

    page
        .save(page)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the page."
            });
        });

};

exports.findAll = (req, res) => {
    Page.find()
        .populate('folder')
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving pages."
            });
        });
};

exports.findById = (req, res) => {
    Page.find({ _id: req.body._id })
        .populate('folder')
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving pages."
            });
        });

};

//delete pdf file 
exports.deletePdf = (req, res) => {
    if (guardToken.guardToken(req, res)) return false

    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Page.updateOne(

        { _id: id },
        {
            $pull: { files: { id: req.body.idPdf } }
        },
    ).then(data => {
        if (!data) {
            res.status(404).send({
                message: `Cannot update page with id=${id}.`
            });
        } else res.send({ message: "Page was updated successfully.", info: data });
    })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Page with id=" + id
            });
        });
};

// Update a page by the id in the request
exports.update = (req, res) => {
    if (guardToken.guardToken(req, res)) return false

    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    if (!req.body.name) {
        return res.status(400).send({
            status: 400,
            error: {
                type: "Validation error",
                message: "Name is required"
            }
        });
    }
    const id = req.params.id;

    Page.updateOne(
        { _id: id },
        {
            $set:
            {
                html: req.body.html,
                name: req.body.name,
            },
            $push: { files: req.body.files }
        },
    ).then(data => {
        if (!data) {
            res.status(404).send({
                message: `Cannot update page with id=${id}.`
            });
        } else res.send({ message: "Page was updated successfully.", info: data });
    })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Page with id=" + id
            });
        });
};

// Delete a page by id
exports.delete = (req, res) => {
    if (guardToken.guardToken(req, res)) return false

    const id = req.params.id;

    Page.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete page with id=${id}. Maybe Page was not found!`
                });
            } else {
                res.send({
                    message: "Page was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete page with id=" + id
            });
        });

};

exports.findPage = (req, res) => {

    Page.find({
        name: { $regex: new RegExp(`${req.body.title}`, "i") }
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: 'Не вдалось отримати новини.',
            });
        });
};