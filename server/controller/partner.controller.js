const db = require('../models');
const Partner = db.partner;
const partner = require('../models/partner');
const guardToken = require("../middleware/guardToken")
const code = require('../generator/passwordGenerator');
const uploadImage = require('../uploader/uploader')

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
    
    const id = req.body.id;

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

        Partner.findOne({_id: id}).select('path_img').then(image => {
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
                uploadImage.deleteFile(data.path_img)
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

