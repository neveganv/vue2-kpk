const db = require('../models');
const EntrantInfo = db.entrantInfo;
const guardToken = require("../middleware/guardToken");
const { response } = require('express');

// find entrant info by id
exports.findAll = (req, res) => {
    EntrantInfo.find({})
        .then(data => {
            response.length = 1;
            response.message = "Success find all entrant info";
            response.result = data[0];
            res.send(response);
        })
        .catch(err => {
            response.status = 500;
            response.message = "Some error occurred while retrieving entrant info."
            response.errors.type = "Type"
            response.errors.message = "Some error occurred while retrieving entrant info."
            return res.status(response.status).send(response);
        });
};

// update entrant info by id
exports.update = async (req, res) => {
    if (await guardToken.guardToken(req, res)) return false

    if (!req.body) {
        response.status = 400
        response.error.type = "Data empty"
        response.error.message = "Data to update can not be empty!"
        return res.status(response.status).send(response)
    }
    const id = req.params.id;
    EntrantInfo.findByIdAndUpdate(
        id,
        req.body,
        { useFindAndModify: false }
    )
        .then(data => {
            if (!data) {
                response.status = 404;
                response.error.type = "Invalid data";
                response.error.message = `Cannot update entrant info with id=${id}.`;
                response.message = "Invalid data"
                return res.status(response.status).send(response);
            } else {
                response.length = 1;
                response.message = "EntrantInfo was updated successfully.";
                response.result = data;
                res.send(response);
            }
        })
        .catch(err => {
            response.status = 500;
            response.error.type = "Invalid data";
            response.error.message = `Error updating entrant info with id=${id}.`;
            response.message = "Invalid data"
            return res.status(response.status).send(response);
        });
};


