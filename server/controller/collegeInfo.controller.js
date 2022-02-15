const db = require('../models');
const CollegeInfo = db.collegeInfo;
const guardToken = require("../middleware/guardToken")
// find entrant info by id
exports.findAll = (req, res) => {
    CollegeInfo.find({})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: 'Some error occurred while retrieving college info.',
            });
        });
};

// update entrant info by id
exports.update = async(req, res) => {
    if(await guardToken.guardToken(req,res)) return  false

    if (!req.body) {
        return res.status(400).send({
            message: 'Data to update can not be empty!',
        });
    }
    const id = req.params.id;
    CollegeInfo.findByIdAndUpdate(
        id,
        req.body,
        { useFindAndModify: false }
    )
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update college info with id=${id}.`,
                });
            } else res.send({ message: 'CollegeInfo was updated successfully.' });
        })
        .catch(err => {
            res.status(500).send({
                message: 'Error updating college info with id=' + id,
            });
        });
};


