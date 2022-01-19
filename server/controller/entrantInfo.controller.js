const db = require('../models');
const EntrantInfo = db.entrantInfo;

// find entrant info by id
exports.findAll = (req, res) => {
    EntrantInfo.find({})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: 'Some error occurred while retrieving entrant info.',
            });
        });
};

// update entrant info by id
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: 'Data to update can not be empty!',
        });
    }
    const id = req.params.id;
    EntrantInfo.findByIdAndUpdate(
        id,
        req.body,
        { useFindAndModify: false }
    )
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update entrant info with id=${id}.`,
                });
            } else res.send({ message: 'EntrantInfo was updated successfully.' });
        })
        .catch(err => {
            res.status(500).send({
                message: 'Error updating entrant info with id=' + id,
            });
        });
};


