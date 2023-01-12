const db = require('../models');
const PrepareCourse = db.prepareCourse;
const prepareСourse = require('../models/prepareСourse');
const guardToken = require("../middleware/guardToken")

let response = {
    status: 200,
    result: null,
    message: null,
    length: 0
}

// Create a new optionsList
exports.create = async (req, res) => {
    if (req.body) {
        let validateError = {
            status: 400,
            error: {
                type: "Validation error",
                message: "",
            }
        };
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
                response.length = 1;
                response.result = data;
                response.message = "Success create prepare course"
                res.send(response);
            })
            .catch(err => {
                response.status = 500;
                response.message = "Some error occurred while creating the preparing course.";
                response.error.type = "";
                response.error.message = err.message || "Some error occurred while creating the preparing course.";
                res.status(response.status).send(response);
            });
    }
    else {
        response.status = 400;
        response.message = "Validation error";
        response.error.type = "Validation error";
        response.error.message = "Name , surname, middle name , parant phone, student phone , pass id is required";
        res.status(response.status).send(response);
    }

};

exports.findPrepareCourseById = (req, res) => {
    PrepareСourse.find({
        _id: req.body.id,

    })
        .then(data => {
            response.length = 1;
            response.message = "Success find prepare course";
            response.result = data;
            res.send(response);
        })
        .catch(err => {
            response.status = 500;
            response.message = "Some error occurred while find the prepare course.";
            response.error.type = "";
            response.error.message = "Не вдалось отримати заявку за вибраним ід.";
            return res.status(response.status).send(response);
        });
};

exports.update = async (req, res) => {
    if (await guardToken.guardToken(req, res)) return false

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
                response.status = 404;
                response.error.type = "Invalid data";
                response.error.message = `Cannot update prepare course with id=${id}.`;
                response.message = "Invalid data"
                return res.status(response.status).send(response);
            } else {
                response.length = 1;
                response.message = "Prepare course was updated successfully.";
                response.result = data;
                res.send(response);
            }
        })
        .catch(err => {
            response.status = 500;
            response.error.type = "Invalid data";
            response.error.message = `Error updating Prepare course with id=${id}.`;
            response.message = "Invalid data"
            return res.status(response.status).send(response);
        });
};

exports.findAll = async (req, res) => {
    if (await guardToken.guardToken(req, res)) return false
    PrepareCourse.find().sort({ 'created': 'desc' })
        .then(data => {
            response.length = data.lenght;
            response.message = "Success find all prepare course";
            response.result = data;
            res.send(response);
        })
        .catch(err => {
            response.status = 500;
            response.message = "Some error occurred while find the prepare course.";
            response.error.type = "";
            response.error.message = "Some error occurred while find the prepare course.";
            return res.status(response.status).send(response);
        });
};

exports.deleteApplications = async (req, res) => {
    if (await guardToken.guardToken(req, res)) return false
    let applications = JSON.parse(req.body.applications)
    console.log(applications)

    try {
        for (let i = 0; i < applications.length; i++) {
            console.log(applications[i])
            PrepareCourse.findOne( {_id: applications[i] }).remove().exec()
        }
        response.length = applications.length;
        response.message = "Successfully deleted";
        response.status = 200
        res.send(response);
    }
    catch {
        response.status = 500;
        response.message = "Some error occurred while delete the prepare course.";
        response.error.type = "";
        response.error.message = "Some error occurred while delete the prepare course.";
        return res.status(response.status).send(response);
    }

}