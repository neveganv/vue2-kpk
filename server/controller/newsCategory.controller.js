const db = require("../models");
const NewsCategory = db.newsCategory


// Create a new optionsList
exports.create = (req, res) => {
    console.log("Категорія:",req.body.name)
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

exports.findAll = (req,res) => {
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
