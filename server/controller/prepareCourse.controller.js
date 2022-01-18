const db = require('../models');
const PrepareCourse = db.prepareCourse;
const prepareСourse = require('../models/prepareСourse');

// Create a new optionsList
exports.create = (req, res) => {
    const prepareCourse = new PrepareCourse({
        name: req.body.name,
        surname: req.body.surname,
        middle_name: req.body.middle_name,
        parent_phone: req.body.parent_phone,
        pass_id: req.body.pass_id,
    });
    prepareCourse
        .save(prepareCourse)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while creating the preparing course.',
            });
        });
};

exports.findPrepareCourseById = (req, res) => {
    PrepareСourse.find({
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

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: 'Data to update can not be empty!',
        });
    }
    const id = req.body.id;
    PrepareCourse.findByIdAndUpdate(
        id,
        {
            name: req.body.name,
            surname: req.body.surname,
            middle_name: req.body.middle_name,
            parent_phone: req.body.parent_phone,
            pass_id: req.body.pass_id,
        },
        { useFindAndModify: false }
    )
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update prepare course with id=${id}.`,
                });
            } else res.send({ message: 'Prepare course was updated successfully.' });
        })
        .catch(err => {
            res.status(500).send({
                message: 'Error updating Prepare course with id=' + id,
            });
        });
};