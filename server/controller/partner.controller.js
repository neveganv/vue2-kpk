const db = require('../models');
const Partner = db.partner;
const partner = require('../models/partner');
const guardToken = require("../middleware/guardToken")


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
        else {
            const partner = new Partner({
                path_img: req.body.path_img,
                path_link: req.body.path_link,
                partner_name: req.body.partner_name,
            });
            partner
                .save(partner)
                .then(data => {
                    res.send(data);
                })
                .catch(err => {
                    res.status(500).send({
                        message: err.message || 'Some error occurred while creating the partner.',
                    });
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
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: 'Не вдалось отримати новини за вибраним ід.',
            });
        });
};

exports.findAll = (req, res) => {
    Partner.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving blogs.',
            });
        });
};

exports.update = async (req, res) => {
    if (await guardToken.guardToken(req, res)) return false
    if (!req.body) {
        return res.status(400).send({
            message: 'Data to update can not be empty!',
        });
    }
    let response = {
        status: "Success",
        error: {
            type: null,
            message: null,
        },
        result: null,
        message: null
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
        const id = req.body.id;
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
                    response.status = "Error";
                    response.error.type = "Xz";
                    response.error.message = `Cannot update news with id=${id}.`;
                    response.message = "Not found"
                    return res.status(404).send(response);
                } else {
                    response.message = "News was updated successfully."
                    res.send(response);
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: 'Error updating News with id=' + id,
                });
            });
    }
};
exports.deletePartner = async (req, res) => {
    if (await guardToken.guardToken(req, res)) return false
    const id = req.params.id;

    Partner.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete partner with id=${id}.`
                });
            } else {
                res.send({
                    message: "Partner was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete partner with id=" + id
            });
        });

};

