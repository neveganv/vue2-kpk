const db = require('../models');
const User = db.user;
const email = require('../email/email.send');
const password = require('../generator/passwordGenerator');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { ObjectId } = require('bson');
require('dotenv').config();
const guardToken = require("../middleware/guardToken");

let response = {
    status: 200,
    result: null,
    message: null,
    length: 0
}

// Create a new User
exports.create = async (req, res) => {
	if (await guardToken.guardToken(req, res)) return
	// generate pass
	let pass = password.generate();

	//hashing pass
	let salt = crypto.randomBytes(16).toString('hex');
	let hash = crypto.pbkdf2Sync(pass, salt, 1000, 64, `sha512`).toString(`hex`);

	const user = new User({
		type: req.body.type,
		name: req.body.name,
		surname: req.body.surname,
		email: req.body.email,
		phone: req.body.phone,
		hash: hash,
		salt: salt,
		position: req.body.position,
	});

	// send email to institution
	if (req.body.email) {
		email.sendEmail(req.body.email, pass, 'Ви зареєстровані на сайті КПК.');
	}

	user
		.save(user)
		.then(data => {
			response.length = 1;
			response.result = data;
			response.message = "Success create user"
			res.send(response);
		})
		.catch(err => {
			response.status = 500;
			response.message = "Some error occurred while creating the user.";
			response.error.type = "";
			response.error.message = err.message || "Some error occurred while creating the user.";
			res.status(response.status).send(response);
		});
};

// login user
exports.login = (req, res) => {
	User.findOne({ email: req.body.email }, function (err, user) {
		if (user === null) {
			response.status = 400;
			response.message = "Invalid email";
			response.error.type = "invalid email";
			response.error.message = `Користувача не знайдено.`;
			return res.status(response.status).send(response);
		} else {
			var hash = crypto
				.pbkdf2Sync(req.body.password, user.salt, 1000, 64, `sha512`)
				.toString(`hex`);
			if (user.hash == hash) {
				const token = jwt.sign(
					{
						userId: user.id,
						position: user.position,
					},
					process.env.JWT_KEY
				);
				user.token = token;
				user.save();

				return res.status(201).send(user.token);
			} else {
				response.status = 400;
				response.message = "Invalid password";
				response.error.type = "invalid password";
				response.error.message = `Неправильний пароль.`;
				return res.status(response.status).send(response);
			}
		}
	});
};
// get All Users
exports.findAll = async (req, res) => {
	if (await guardToken.guardToken(req, res)) return false

	User.find()
		.populate('position')
		.then(data => {
			response.length = data.length;
			response.result = data;
			response.message = "Success get all users"
			res.send(response);
		})
		.catch(err => {
			response.status = 500;
			response.message = "Some error occurred while retrieving users.";
			response.error.type = "";
			response.error.message = err.message || "Some error occurred while retrieving users.";
			res.status(response.status).send(response);
		});
};

//get by token
exports.getUser = async (req, res) => {

	if (await guardToken.guardToken(req, res)) return false
	User.findOne({ _id: req.userId }, function (err, user) {
		if (user === null) {
			response.status = 400;
			response.message = "Invalid id";
			response.error.type = "invalid id";
			response.error.message = `Користувача не знайдено.`;
			return res.status(response.status).send(response);
		} else {
			res.send(user);
		}
	}).populate('position');
};

exports.update = async (req, res) => {
	if (await guardToken.guardToken(req, res)) return false

	if (!req.body) {
		response.status = 400;
		response.message = "Invalid data";
		response.error.type = "invalid data";
		response.error.message = "Data to update can not be empty!";
		res.status(response.status).send(response);
	}
	const id = req.body.uuid;

	User.findByIdAndUpdate(
		id,
		{
			name: req.body.name,
			surname: req.body.surname,
			phone: req.body.phone,
			email: req.body.email,
		},
		{ useFindAndModify: false }
	)
		.then(data => {
			if (!data) {
				response.status = 404;
				response.message = "Not found";
				response.error.type = "Not found";
				response.error.message = `Cannot update user with id=${id}.`;
				res.status(response.status).send(response);
			} else {
				response.message = 'User was updated successfully.';
				response.result = data;
				response.length = 1;
				res.send(response)
			}
		})
		.catch(err => {
			response.status = 500;
			response.message = "Invalid id";
			response.error.type = "invalid id";
			response.error.message = `Error updating User with id=${id}.`;
			res.status(response.status).send(response);
		});
};

(exports.changePassword = async (req, res) => {
	if (await guardToken.guardToken(req, res)) return false
	id = req.body.id;
	User.findOne({ _id: id }, function (err, user) {
		if (user === null) {
			response.status = 400;
			response.message = "Invalid id";
			response.error.type = "invalid id";
			response.error.message = `Користувача не знайдено.`;
			return res.status(response.status).send(response);
		} else {
			const oldPassword = req.body.oldPassword;
			var oldHash = crypto
				.pbkdf2Sync(oldPassword, user.salt, 1000, 64, `sha512`)
				.toString(`hex`);
			if (user.hash == oldHash) {
				let salt = crypto.randomBytes(16).toString('hex');
				let hash = crypto
					.pbkdf2Sync(req.body.password, salt, 1000, 64, `sha512`)
					.toString(`hex`);
				User.findByIdAndUpdate(
					id,
					{ hash: hash, salt: salt },
					{ useFindAndModify: false }
				)
					.then(data => {
						if (!data) {
							response.status = 404;
							response.message = "Not found";
							response.error.type = "Not found";
							response.error.message = `Cannot update user with id=${id}.`;
							res.status(response.status).send(response);
						} else {
							response.message = 'User was updated successfully.';
							response.result = data;
							response.length = 1;
							res.send(response)
						}
					})
					.catch(err => {
						response.status = 500;
						response.message = "Invalid id";
						response.error.type = "invalid id";
						response.error.message = `Error updating user with id=${id}.`;
						res.status(response.status).send(response);
					});
			} else {
				response.status = 400;
				response.message = "Invalid password";
				response.error.type = "invalid password";
				response.error.message = `Неправильний пароль.`;
				return res.status(response.status).send(response);
			}
		}
	});
}),
	(exports.deleteUser = async (req, res) => {
		if (await guardToken.guardToken(req, res)) return false
		const id = req.body.id;

		User.findByIdAndRemove(id)
		.then(data => {
			if (!data) {
				response.status = 404;
				response.message = "Not found";
				response.error.type = "Not found";
				response.error.message = `Cannot delete user with id=${id}. Maybe user was not found!`;
				res.status(response.status).send(response);
			} else {
				response.message = 'User was deleted successfully!';
				response.length = 1;
				response.result = data;
				res.send(response);
			}
		})
		.catch(err => {
			response.status = 500;
			response.message = "Invalid id";
			response.error.type = "invalid id";
			response.error.message = `Could not delete user with id=${id}.`;
			res.status(response.status).send(response);
		});
	}),
	//Find user by Id
	(exports.findUserById = async (req, res) => {
		if (await guardToken.guardToken(req, res)) return false
		User.find({
			_id: req.body.id,
		})
		.then(data => {
            response.length = 1;
            response.result = data[0];
            response.message = "Success find user by id"
            res.send(response);
        })
        .catch(err => {
            response.status = 500;
            response.message = "Some error occurred while retrieving user.";
            response.error.type = "Invalid id";
            response.error.message = "Some error occurred while retrieving user.";
            res.status(response.status).send(response);
        });
	});
