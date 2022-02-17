const db = require("../../models");
const Group = db.group
const guardToken = require("../../middleware/guardToken")

// Create a new optionsList
exports.createGroup = async(req, res) => {
    if(await guardToken.guardToken(req,res)) return  false
    
    if (!req.body.name) {
        return res.status(400).send({
            status: 400,
            error: {
                type: "Validation error",
                message: "Name is required"
            }
        });
    }

      const group = new Group({
          name: req.body.name
      });

    // Save optionsList in the database
    group
        .save(group)
        .then(data => {
            response.length = 1;
            response.result = data;
            response.message = "Success create group"
            res.send(response);
        })
        .catch(err => {
            response.status = 500;
            response.message = "Some error occurred while creating the group.";
            response.error.type = "";
            response.error.message = err.message || "Some error occurred while creating the group.";
            res.status(response.status).send(response);
        });

};

exports.findAll = (req,res) => {
    Group.find()
    .then(data => {
        response.length = data.length;
        response.result = data;
        response.message = "Success get all gruops"
        res.send(response);
    })
    .catch(err => {
        response.status = 500;
        response.message = "Some error occurred while retrieving gruops.";
        response.error.type = "";
        response.error.message = err.message || "Some error occurred while retrieving gruops.";
        res.status(response.status).send(response);
    });
};
