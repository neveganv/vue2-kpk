const db = require("../models");
const NewsCategory = db.newsCategory
const guardToken = require("../middleware/guardToken")

let response = {
    status: 200,
    result: null,
    message: null,
    length: 0
}

// Create a new optionsList
exports.create = async (req, res) => {
    if (await guardToken.guardToken(req, res)) return false

    if (!req.body.name) {
        return res.status(400).send({
            status: 400,
            error: {
                type: "Validation error",
                message: "Name is required"
            }
        });
    }

    const newsCategory = new NewsCategory({
        name: req.body.name
    });

    // Save optionsList in the database
    newsCategory
        .save(newsCategory)
        .then(data => {
            response.length = 1;
            response.result = data;
            response.message = "Success create news category"
            res.send(response);
        })
        .catch(err => {
            response.status = 500;
            response.message = "Some error occurred while creating the news category.";
            response.error.type = "";
            response.error.message = err.message || "Some error occurred while creating the news category.";
            res.status(response.status).send(response);
        });

};

exports.findAll = (req, res) => {
    NewsCategory.find()
        .then(data => {
            response.length = data.length;
            response.result = data;
            response.message = "Success get all news categorys"
            res.send(response);
        })
        .catch(err => {
            response.status = 500;
            response.message = "Some error occurred while retrieving specialty.";
            response.error.type = "";
            response.error.message = err.message || "Some error occurred while retrieving news category.";
            res.status(response.status).send(response);
        });
};
