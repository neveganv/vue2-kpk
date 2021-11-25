const db = require("../../models");
const Event = db.shedul


// Create a new optionsList
exports.create = (req, res) => {
    console.log("name:" ,req.body.name,
        "group:" ,req.body.group,
        "link:" ,req.body.link,
        "start:" ,req.body.start,
       " end:", req.body.end,
        "content:" ,req.body.content)
      const event = new Event({
          name: req.body.name,
          group: req.body.group,
          link: req.body.link,
          start: req.body.start,
          end: req.body.end,
          content: req.body.content
      });

    // Save optionsList in the database
    event
        .save(event)
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
    Event.find()
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
