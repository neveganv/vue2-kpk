const db = require("../models");
const NewsCategory = db.newsCategory
const guardToken = require("../middleware/guardToken")


// Create a new optionsList
exports.create = async(req, res) => {
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
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the order."
            });
        });

};

exports.findAll = (req, res) => {
    NewsCategory.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving blogs."
            });
        });
};
