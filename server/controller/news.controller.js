const db = require("../models");
const News = db.news


// Create a new optionsList
exports.create = (req, res) => {
      const news = new News({
          title: req.body.title,
          content: req.body.content
      });
    console.log("title: ",req.body.title)
    // Save optionsList in the database
    news
        .save(news)
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
    News.find()
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
