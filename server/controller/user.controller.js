const db = require("../models");
const User = db.user
const email = require("../email/email.send");
const password = require("../generator/passwordGenerator");
const crypto = require('crypto');


// Create a new optionsList
exports.create = (req, res) => {

    // generate pass
    let pass = password.generate()

    //hashing pass
    let salt = crypto.randomBytes(16).toString('hex');
    let hash = crypto.pbkdf2Sync(pass, salt,
        1000, 64, `sha512`).toString(`hex`);


    const user = new User({
        type: req.body.type,
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        phone: req.body.phone,
        hash: hash,
        salt: salt,
        position: req.body.position
    });

    // send email to institution
    if (req.body.email) {
        email.sendEmail(req.body.email, pass, "Ви зареєстровані на сайті КПК.")
    }

    user
        .save(user)
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
    User.find().populate('position')
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
