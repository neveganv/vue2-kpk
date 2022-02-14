const db = require('../models');
const PrepareCourse = db.prepareCourse;
const prepareСourse = require('../models/prepareСourse');
const guardToken = require("../middleware/guardToken")

// Create a new optionsList
exports.create = (req, res) => {
    if (guardToken.guardToken(req, res)) return false

    if (req.body) {
        if (!req.body.name) {
            validateError.error.message = "Name is required";
            return res.status(400).send(validateError);
        }
        if (!req.body.surname) {
            validateError.error.message = "Surname is required";
            return res.status(400).send(validateError);
        }
        if (!req.body.middle_name) {
            validateError.error.message = "Middle name is required";
            return res.status(400).send(validateError);
        }
        if (!req.body.parent_phone) {
            validateError.error.message = "Parent phone is required";
            return res.status(400).send(validateError);
        }
        if (!req.body.student_phone) {
            validateError.error.message = "Student phone is required";
            return res.status(400).send(validateError);
        }
        if (!req.body.pass_id) {
            validateError.error.message = "Pass id is required";
            return res.status(400).send(validateError);
        }

        const prepareCourse = new PrepareCourse({
            name: req.body.name,
            surname: req.body.surname,
            middle_name: req.body.middle_name,
            parent_phone: req.body.parent_phone,
            student_phone: req.body.student_phone,
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
    }
    else {
        return res.status(400).send({
            message: "Name , surname, middle name , parant phone, student phone , pass id is required"
        })
    }

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
                message: 'Не вдалось отримати заявку за вибраним ід.',
            });
        });
};

exports.update = (req, res) => {
    if (guardToken.guardToken(req, res)) return false

    let validateError = {
        status: 400,
        error: {
            type: "Validation error",
            message: "",
        }
    };

    if (!req.body) {
        validateError.error.message = "Data to update can not be empty!";
        return res.status(400).send(validateError);
    }
    if (!req.body.name) {
        validateError.error.message = "Name is required";
        return res.status(400).send(validateError);
    }
    if (!req.body.surname) {
        validateError.error.message = "Surname is required";
        return res.status(400).send(validateError);
    }
    if (!req.body.middle_name) {
        validateError.error.message = "Middle name is required";
        return res.status(400).send(validateError);
    }
    if (!req.body.parent_phone) {
        validateError.error.message = "Parent phone is required";
        return res.status(400).send(validateError);
    }
    if (!req.body.student_phone) {
        validateError.error.message = "Student phone is required";
        return res.status(400).send(validateError);
    }
    if (!req.body.pass_id) {
        validateError.error.message = "Pass id is required";
        return res.status(400).send(validateError);
    }

    const id = req.body.id;
    PrepareCourse.findByIdAndUpdate(
        id,
        {
            name: req.body.name,
            surname: req.body.surname,
            middle_name: req.body.middle_name,
            parent_phone: req.body.parent_phone,
            student_phone: req.body.student_phone,
            pass_id: req.body.pass_id,
            status: req.body.status
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

exports.findAll = (req, res) => {
    if (guardToken.guardToken(req, res)) return false
    PrepareCourse.find().sort({ 'created': 'desc' })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving blogs.',
            });
        });
};