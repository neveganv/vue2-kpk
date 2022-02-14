const db = require('../models');
const Partner = db.partner;
const partner = require('../models/partner');
const guardToken = require("../middleware/guardToken")


// Create a partner 
exports.create = (req, res) => {
    if (guardToken.guardToken(req, res)) return false
    if (req.body) {
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
    else {
        res.status(500).send({
            message: "Image,link and partner name is required"
        });
    }
};

exports.findPartnerById = (req, res) => {
    if (guardToken.guardToken(req, res)) return false
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

exports.update = (req, res) => {
    if (guardToken.guardToken(req, res)) return false
    if (!req.body) {
        return res.status(400).send({
            message: 'Data to update can not be empty!',
        });
    }
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
                res.status(404).send({
                    message: `Cannot update news with id=${id}.`,
                });
            } else res.send({ message: 'News was updated successfully.' });
        })
        .catch(err => {
            res.status(500).send({
                message: 'Error updating News with id=' + id,
            });
        });
};
exports.deletePartner = (req, res) => {
    if (guardToken.guardToken(req, res)) return false
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

