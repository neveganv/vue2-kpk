const db = require("../../models");
const Event = db.shedul


// Create a new Event
exports.create = (req, res) => {
      const event = new Event({
          name: req.body.name,
          group: req.body.group,
          link: req.body.link,
          start: req.body.start,
          end: req.body.end,
          content: req.body.content
      });

    // Save Event in the database
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

exports.findByGroup = (req,res) => {
    Event.find({
        group: req.body.group
    })
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
