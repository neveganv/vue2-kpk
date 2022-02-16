const db = require('../models');
const CollegeInfo = db.collegeInfo;
const guardToken = require("../middleware/guardToken")

let response = {
    status: 200,
    result: null,
    message: null,
    length: 0
}

// find entrant info by id
exports.findAll = (req, res) => {
    CollegeInfo.find()
        .then(data => {
            response.length = 1;
            response.message = "Success find all colleg info";
            response.result = data[0];
            res.send(response);
        })
        .catch(err => {
            response.status = 500;
            response.message = "Some error occurred while retrieving college info."
            response.errors.type = "Type"
            response.errors.message = "Some error occurred while retrieving college info."
            return res.status(response.status).send(response);
        });
};

// update entrant info by id
exports.update = async (req, res) => {
    if (await guardToken.guardToken(req, res)) return false

    if (!req.body) {
        response.status = 400
        response.message = "Data to update can not be empty!"
        response.error.type = "Empty data"
        response.error.message = "Data to update can not be empty!"
        return res.status(response.status).send(response);
    }
    const id = req.params.id;
    CollegeInfo.findByIdAndUpdate(
        id,
        req.body,
        { useFindAndModify: false }
    )
        .then(data => {
            if (!data) {
                response.status = 404;
                response.error.type = "Invalid data";
                response.error.message = `Cannot update college info with id=${id}.`;
                response.message = "Invalid data"
                return res.status(response.status).send(response);
            } else {
                response.length = 1;
                response.message = "CollegeInfo was updated successfully.";
                response.result = data;
                res.send(response);
            }
        })
        .catch(err => {
            response.status = 500;
            response.error.type = "Invalid data";
            response.error.message = `Error updating college info with id=${id}.`;
            response.message = "Invalid data"
            return res.status(response.status).send(response);
        });
};


