const db = require("../models");
const News = db.news


// Create a new optionsList
exports.create = (req, res) => {
      const news = new News({
          category: req.body.category,
          title: req.body.title,
         // content: req.body.content,
          main_img: req.body.main_img
      });
    news
        .save(news)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the news."
            });
        });

};

exports.findByCategory = (req, res) => {
  News.find({
      idCategory: req.params.id
  })
      .then(data => {
          res.send(data);
      })
      .catch(err => {
          res.status(500).send({
              message:
                  "Не вдалось отримати новини за вибраною категорією."
          });
      });
};
  

exports.findAll = (req,res) => {
    News.find()
    .populate('category')
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
