const db = require("../models");
const NewsCategory = db.newsCategory
const guardToken = require("../middleware/guardToken")


// Create a new optionsList
exports.create = (req, res) => {
    if(guardToken.guardToken(req,res)) return  false
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
