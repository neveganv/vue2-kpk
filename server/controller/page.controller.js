const db = require("../models");
const Page = db.page
const guardToken = require("../middleware/guardToken");

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

    const page = new Page({
        name: req.body.name,
        folder: req.body.folder,
    });

    page
        .save(page)
        .then(data => {
            response.length = 1;
            response.result = data;
            response.message = "Success create page"
            res.send(response);
        })
        .catch(err => {
            response.status = 500;
            response.message = "Some error occurred while creating the page.";
            response.error.type = "";
            response.error.message = err.message || "Some error occurred while creating the page.";
            res.status(response.status).send(response);
        });

};

exports.findAll = (req, res) => {
    Page.find()
        .populate('folder')
        .then(data => {
            response.length = data.length;
            response.result = data;
            response.message = "Success get all pages"
            res.send(response);
        })
        .catch(err => {
            response.status = 500;
            response.message = "Some error occurred while retrieving pages.";
            response.error.type = "";
            response.error.message = err.message || "Some error occurred while retrieving pages.";
            res.status(response.status).send(response);
        });
};

exports.findById = (req, res) => {
    Page.find({ _id: req.body._id })
        .populate('folder')
        .then(data => {
            response.length = 1;
            response.result = data;
            response.message = "Success find page by id"
            res.send(response);
        })
        .catch(err => {
            response.status = 500;
            response.message = "Some error occurred while retrieving page.";
            response.error.type = "Invalid id";
            response.error.message = "Some error occurred while retrieving page.";
            res.status(response.status).send(response);
        });

};

//delete pdf file 
exports.deletePdf = async (req, res) => {
    if (await guardToken.guardToken(req, res)) return false

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
            response.status = 404;
            response.message = `Cannot update page with id=${id}.`;
            response.error.type = "Not found";
            response.error.message = `Cannot update page with id=${id}.`
            res.status(response.status).send(response);
        } else {
            response.length = 1;
            response.message = "Folder was updated successfully."
            response.result = data;
            res.send(response);
        }
    })
        .catch(err => {
            response.status = 500;
            response.message = "Invalid id";
            response.error.type = "invalid id";
            response.error.message = `Error updating Page with id=${id}.`;
            res.status(response.status).send(response);
        });
};

// Update a page by the id in the request
exports.update = async (req, res) => {
    if (await guardToken.guardToken(req, res)) return false

    if (!req.body) {
        response.status = 400;
        response.message = "Invalid data";
        response.error.type = "invalid data";
        response.error.message = "Data to update can not be empty!";
        res.status(response.status).send(response);
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
            response.status = 404;
            response.message = "Not found";
            response.error.type = "Not found";
            response.error.message = `Cannot update page with id=${id}.`;
            res.status(response.status).send(response);
        } else {
            response.message = 'Page was updated successfully.';
            response.result = data;
            response.length = 1;
            res.send(response)
        }
    })
        .catch(err => {
            response.status = 500;
            response.message = "Invalid id";
            response.error.type = "invalid id";
            response.error.message = `Error updating Page with id=${id}.`;
            res.status(response.status).send(response);
        });
};

// Delete a page by id
exports.delete = async (req, res) => {
    if (await guardToken.guardToken(req, res)) return false

    const id = req.params.id;

    Page.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                response.status = 404;
                response.message = "Not found";
                response.error.type = "Not found";
                response.error.message = `Cannot delete page with id=${id}.`;
                res.status(response.status).send(response);
            } else {
                uploadImage.deleteFile(data.img)
                response.message = 'Page was deleted successfully!';
                response.length = 1;
                response.result = data;
                res.send(response);
            }
        })
        .catch(err => {
            response.status = 500;
            response.message = "Invalid id";
            response.error.type = "invalid id";
            response.error.message = `Could not delete page with id=${id}.`;
            res.status(response.status).send(response);
        });

};

exports.findPage = (req, res) => {

    Page.find({
        name: { $regex: new RegExp(`${req.body.title}`, "i") }
    })
        .then(data => {
            response.message = "Find pages successfully!";
            response.result = data;
            response.length = data.length;
            res.send(response);
        })
        .catch(err => {
            response.status = 500;
            response.message = "Not found";
            response.error.type = "Not found";
            response.error.message = `Не вдалось отримати сторінки.`;
            res.status(response.status).send(response);
        });
};