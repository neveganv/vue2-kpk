const db = require("../models");
const OptionsList = db.optionsList


// Create a new optionsList
exports.create = (req, res) => {
      const optionsList = new OptionsList({
          title: req.body.title,
      });
    console.log("title: ",req.body.title)
    // Save optionsList in the database
    optionsList
        .save(optionsList)
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
