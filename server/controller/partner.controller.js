const db = require('../models');
const Partner = db.partner;
const partner = require('../models/partner');
const guardToken = require("../middleware/guardToken")
const code = require('../generator/passwordGenerator');
const uploadImage = require('../uploader/uploader')

let response = {
    status: 200,
    result: null,
    message: null,
    length: 0
}

// Create a partner 
exports.create = async (req, res) => {
    if (await guardToken.guardToken(req, res)) return false
    if (req.body) {
        let validateError = {
            status: 400,
            error: {
                type: "Validation error",
                message: "",
            }
        };
        if (!req.body.path_img) {
            validateError.error.message = "Img is required";
            return res.status(400).send(validateError);
        }
        else if (!req.body.path_link) {
            validateError.error.message = "Link is required";
            return res.status(400).send(validateError);
        }
        else if (!req.body.partner_name) {
            validateError.error.message = "Name is required";
            return res.status(400).send(validateError);
        }
        let name = "partner-" + code.generate() + '.jpg';
        let status = uploadImage.uploadFile(name, req.body.path_img)
        if (status == 500) {
            return res.status(400).send({
                status: 400,
                error: {
                    type: "Image error",
                    message: "Error with uploading image"
                }
            });
        }

        else {
            const partner = new Partner({
                path_img: req.protocol + '://' + req.get('host') + '/uploads/' + name,
                path_link: req.body.path_link,
                partner_name: req.body.partner_name,
            });
            partner
                .save(partner)
                .then(data => {
                    response.length = 1;
                    response.message = "Success create partner";
                    response.result = data;
                    return res.send(response);
                })
                .catch(err => {
                    response.status = 500;
                    response.message = "Some error occurred while creating the partner.";
                    response.error.type = "";
                    response.error.message = err.message || "Some error occurred while creating the partner.";
                    return res.status(response.status).send(response);
                });
        }
    }
    else {
        return res.status(400).send({
            message: "Image,link and partner name is required"
        });
    }
};

exports.findPartnerById = async (req, res) => {
    if (await guardToken.guardToken(req, res)) return false
    Partner.find({
        _id: req.body.id,

    })
        .then(data => {
            response.length = 1;
            response.message = "Success find partner";
            response.result = data;
            return res.send(response);
        })
        .catch(err => {
            response.status = 500;
            response.message = "Some error occurred while find the partner.";
            response.error.type = "";
            response.error.message = "Не вдалось отримати новини за вибраним ід.";
            return res.status(response.status).send(response);
        });
};

exports.findAll = (req, res) => {
    Partner.find()
        .then(data => {
            response.length = data.length;
            response.result = data;
            response.message = "Success get all partners"
            res.send(response);
        })
        .catch(err => {
            response.status = 500;
            response.message = "Some error occurred while retrieving partners"
            response.error.type = "Invalid";
            response.error.message = err.message || 'Some error occurred while retrieving partners.'
            res.status(response.status).send(response);
        });
};

exports.update = async (req, res) => {
    if (await guardToken.guardToken(req, res)) return false

    const id = req.body.id;

    if (!req.body) {
        response.status = 400
        response.message = "Data to update can not be empty!"
        response.error.type = "Empty field!"
        response.error.message = "Data to update can not be empty!"
        return res.status(response.status).send(response);
    }
    let validateError = {
        status: 400,
        error: {
            type: "Validation error",
            message: "",
        }
    };
    if (!req.body.path_img) {
        validateError.error.message = "Img is required";
        return res.status(400).send(validateError);
    }
    else if (!req.body.path_link) {
        validateError.error.message = "Link is required";
        return res.status(400).send(validateError);
    }
    else {

        if (req.body.path_img && !req.body.path_img.startsWith(req.protocol + '://' + req.get('host') + '/uploads/')) {
            let name = "partner-" + code.generate() + '.jpg';
            let status = uploadImage.uploadFile(name, req.body.path_img)
            if (status == 500) {
                return res.status(400).send({
                    status: 400,
                    error: {
                        type: "Image error",
                        message: "Error with uploading image"
                    }
                });
            }
            req.body.path_img = req.protocol + '://' + req.get('host') + '/uploads/' + name

            Partner.findOne({ _id: id }).select('path_img').then(image => {
                uploadImage.deleteFile(image.path_img)
            })
        }

        Partner.findByIdAndUpdate(
            id,
            {
                path_img: req.body.path_img,
                path_link: req.body.path_link,
                partner_name: req.body.partner_name,
            },
            { useFindAndModify: false }
        )
            .then(data => {
                if (!data) {
                    response.status = 404;
                    response.error.type = "Invalid data";
                    response.error.message = `Cannot update news with id=${id}.`;
                    response.message = "Invalid data"
                    return res.status(response.status).send(response);
                } else {
                    response.message = "News was updated successfully."
                    response.result = data;
                    res.send(response);
                }
            })
            .catch(err => {
                response.status = 500;
                response.error.type = "Invalid data";
                response.error.message = `Error updating partner with id==${id}.`;
                response.message = "Invalid data"
                return res.status(response.status).send(response);
            });
    }
};
exports.deletePartner = async (req, res) => {
    if (await guardToken.guardToken(req, res)) return false
    const id = req.params.id;

    Partner.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                response.message = `Cannot delete partner with id=${id}.`
                response.status = 404
                response.error.type = "Invalid id"
                response.error.message = `Cannot delete partner with id=${id}.`
                res.status(response.status).send(response);
            } else {
                uploadImage.deleteFile(data.path_img)
                response.message = "Partner was deleted successfully!"
                res.send(response);
            }
        })
        .catch(err => {
            response.message = `Could not delete partner with id=${id}`
            response.status = 404
            response.error.type = "Invalid id"
            response.error.message = `Could not delete partner with id=${id}`
            res.status(response.status).send(response);
        });

};

