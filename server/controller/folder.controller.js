const db = require("../models");
const Folder = db.folder
const Page = db.page
const guardToken = require("../middleware/guardToken")

let response = {
	status: 200,
	result: null,
	message: null,
	length: 0
}

// Create a new page
exports.create = async (req, res) => {
    if (await guardToken.guardToken(req, res)) return false

    if (!req.body.name) {
        return res.status(400).send({
            status: 400,
            error: {
                type: "Validation error",
                message: "Name is required"
            }
        });
    }

    const folder = new Folder({
        name: req.body.name,
    });

    for (i = 0; i < req.body.positions.length; i++) {
        folder.positions.push(req.body.positions[i])
    }

    folder
        .save(folder)
        .then(data => {
            response.length = 1;
            response.result = data;
            response.message = "Success create folder"
            res.send(response);
        })
        .catch(err => {
            response.status = 500;
            response.message = "Some error occurred while creating the folder.";
            response.error.type = "";
            response.error.message = err.message || "Some error occurred while creating the folder.";
            res.status(response.status).send(response);
        });

};

// find all pages
exports.findAll = (req, res) => {
    console.log(req.query.position)
    let options = {}
    if (req.query.position) {
        options = {
            positions: {
                $in: [req.query.position]
            }
        }
    }
    Folder.find(options)
        .populate('positions')
        .then(data => {
            response.length = data.length;
            response.result = data;
            response.message = "Success get all folders"
            res.send(response);
        })
        .catch(err => {
            response.status = 500;
            response.message = "Some error occurred while retrieving folders.";
            response.error.type = "";
            response.error.message = err.message || "Some error occurred while retrieving folders.";
            res.status(response.status).send(response);
        });
};

exports.findById = (req, res) => {
    if (!req.body._id) {
        return res.status(400).send({
            status: 400,
            error: {
                type: "Validation error",
                message: "Field _id is required"
            }
        });
    }
    Page.find({ _id: req.body._id })
        .then(data => {
            response.length = 1;
            response.result = data;
            response.message = "Success find news by id"
            res.send(response);
        })
        .catch(err => {
            response.status = 500;
            response.message = "Some error occurred while retrieving news.";
            response.error.type = "Invalid id";
            response.error.message = "Some error occurred while retrieving news.";
            res.status(response.status).send(response);
        });

};

// Update a folder by the id in the request
exports.update = async (req, res) => {
    if (await guardToken.guardToken(req, res)) return false

    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    const id = req.params.id;

    Folder.findOne({ _id: id })
        .then(data => {
            data.positions = []
            for (i = 0; i < req.body.positions.length; i++) {
                data.positions.push(req.body.positions[i])
            }
            data.name = req.body.name
            data.save(data).then(() => {
                response.length = 1;
                response.message = "Folder was updated successfully."
                response.result = data;
                res.send(response)
            })
        })
        .catch(err => {
            response.status = 500;
            response.message = "Invalid id";
            response.error.type = "invalid id";
            response.error.message = `Error updating Folder with id=${id}.`;
            res.status(response.status).send(response);
        });
};

// Delete a folder by id
exports.delete = async (req, res) => {
    if (await guardToken.guardToken(req, res)) return false

    const id = req.params.id;
    Page.deleteMany({ folder: id }).then(() => {
        Folder.findByIdAndRemove(id)
            .then(data => {
                if (!data) {
                    response.status = 404;
                    response.message = "Not found";
                    response.error.type = "Not found";
                    response.error.message = `Cannot delete folder with id=${id}. Maybe folder was not found!`;
                    res.status(response.status).send(response);
                } else {
                    response.message = 'Folder was deleted successfully!';
                    response.length = 1;
                    response.result = data;
                    res.send(response);
                }
            })
            .catch(err => {
                response.status = 500;
                response.message = "Invalid id";
                response.error.type = "invalid id";
                response.error.message = `Could not delete folder with id=${id}.`;
                res.status(response.status).send(response);
            });
    })

};