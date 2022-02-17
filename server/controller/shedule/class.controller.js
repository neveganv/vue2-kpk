const db = require("../../models");
const Classes = db.classes
const guardToken = require("../../middleware/guardToken")

let response = {
    status: 200,
    result: null,
    message: null,
    length: 0
}


// Create a new optionsList
exports.create = async (req, res) => {
    if (await guardToken.guardToken(req, res)) return false

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
    else if (!req.body.color) {
        validateError.error.message = "Color is required";
        return res.status(400).send(validateError);
    }

    const classes = new Classes({
        name: req.body.name,
        color: req.body.color
    });

    // Save Classes in the database
    classes
        .save(classes)
        .then(data => {
            response.length = 1;
            response.result = data;
            response.message = "Success create class"
            res.send(response);
        })
        .catch(err => {
            response.status = 500;
            response.message = "Some error occurred while creating the classes.";
            response.error.type = "";
            response.error.message = err.message || "Some error occurred while creating the classes.";
            res.status(response.status).send(response);
        });

};

exports.findAll = (req, res) => {
    Classes.find()
        .then(data => {
            response.length = data.length;
            response.result = data;
            response.message = "Success get all classes"
            res.send(response);
        })
        .catch(err => {
            response.status = 500;
			response.message = "Some error occurred while retrieving classes.";
			response.error.type = "";
			response.error.message = err.message || "Some error occurred while retrieving classes.";
			res.status(response.status).send(response);
        });
};
