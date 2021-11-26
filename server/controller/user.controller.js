const db = require("../models");
const User = db.user
const email = require("../email/email.send");
const password = require("../generator/passwordGenerator");
const crypto = require('crypto');
const jwt = require("jsonwebtoken");
require("dotenv").config();


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

// login user
exports.login = (req, res) => {
    User.findOne({ email: req.body.email }, function (err, user) {
        if (user === null) {
            return res.status(400).send({
                message: "Користувача не знайдено."
            });
        }
        else {
            var hash = crypto.pbkdf2Sync(req.body.password,
                user.salt, 1000, 64, `sha512`).toString(`hex`);
            if (user.hash == hash) {
                const token = jwt.sign(
                    {
                        userId: user.id,
                        position: user.position,
                    },
                    process.env.JWT_KEY
                );
                user.token = token
                user.save()

                return res.status(201).send(
                    user.token,
                )
            }
            else {
                return res.status(400).send({
                    message: "Неправильний пароль"
                });
            }
        }
    });
}

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

//get by token
exports.getUser = (req, res) => {
    User.findOne({ _id: req.userId }, function (err, user) {
        if (user === null) {
            return res.status(400).send({
                message: "Користувача не знайдено."
            });
        }
        else {
            res.send(user)
        }
    });
}

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
      const id = req.body.id;
      const user = req.body;
      User.findByIdAndUpdate(id, {user}, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update user with id=${id}.`
            });
          } else res.send({ message: "User was updated successfully." });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating user with id=" + id
          });
        });

};

exports.changePassword = (req, res) => {
    id = req.body.id;
    User.findOne({ _id: id }, function (err, user) {
        if (user === null) {
            return res.status(400).send({
                message: "Користувача не знайдено."
            });
        }
        else {
            console.log(req.body.oldPassword)
            const oldPassword = req.body.oldPassword;
            var oldHash = crypto.pbkdf2Sync(oldPassword,
                user.salt, 1000, 64, `sha512`).toString(`hex`);
            if (user.hash == oldHash) {
                let salt = crypto.randomBytes(16).toString('hex');
                let hash = crypto.pbkdf2Sync(req.body.password, salt,
                    1000, 64, `sha512`).toString(`hex`);
               User.findByIdAndUpdate( id, {hash: hash, salt:salt}, {useFindAndModify: false})
               .then(data => {
                if (!data) {
                  res.status(404).send({
                    message: `Cannot update user with id=${id}.`
                  });
                } else res.send({ message: "User was updated successfully." });
              })
              .catch(err => {
                res.status(500).send({
                  message: "Error updating user with id=" + id
                });
              });
            }
            else {
                return res.status(400).send({
                    message: "Неправильний пароль"
                });
            }
        }
    });
}