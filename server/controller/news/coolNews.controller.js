const db = require('../../models');
const CoolNews = db.coolNews;
const guardToken = require('../../middleware/guardToken');
const code = require('../../generator/passwordGenerator');
const uploadImage = require('../../uploader/uploader');

let response = {
	status: 200,
	result: null,
	message: null,
	length: 0
}

// Create a new news
exports.create = async (req, res) => {
	if (await guardToken.guardToken(req, res)) return false;

	if (!req.body.title) {
		return res.status(400).send({
			status: 400,
			error: {
				type: "Validation error",
				message: "Title is required"
			}
		});
	}

	let name = "coolNews-" + code.generate() + '.jpg';
	let status = uploadImage.uploadFile(name, req.body.img)
	if (status == 500) {
		return res.status(400).send({
			status: 400,
			error: {
				type: "Image error",
				message: "Error with uploading image"
			}
		});
	}

	const coolNews = new CoolNews({
		title: req.body.title,
		img: req.protocol + '://' + req.get('host') + '/uploads/' + name,
		created_time: req.body.created_time,
		content: req.body.content,
	});
	coolNews
		.save(coolNews)
		.then(data => {
			response.length = 1;
			response.result = data;
			response.message = "Success create news"
			res.send(response);
		})
		.catch(err => {
			response.status = 500;
			response.message = "Some error occurred while creating the news.";
			response.error.type = "";
			response.error.message = err.message || "Some error occurred while creating the news.";
			res.status(response.status).send(response);
		});
};

exports.findCoolNewsById = (req, res) => {
	CoolNews.find({
		_id: req.body.id,
	})
		.then(data => {
			response.length = 1;
			response.result = data;
			response.message = "Success find news by id"
			res.send(response);
		})
		.catch(err => {
			response.status = 500;
			response.message = "Some error occurred while retrieving news.";
			response.error.type = "Invalid id";
			response.error.message = "Не вдалось отримати новини за вибраним ід.";
			res.status(response.status).send(response);
			res.status(500).send({
				message: 'Не вдалось отримати новини за вибраним ід.',
			});
		});
};

exports.findAll = (req, res) => {
	let search = {};
	if (req.body.status == 'available') {
		search = { isArchived: 0 };
	} else if (req.body.status == 'archived') {
		search = { isArchived: 1 };
	}
	CoolNews.find(search)
		.sort({ created_time: 'desc' })
		.then(data => {
			response.length = data.length;
			response.result = data;
			response.message = "Success get all news"
			res.send(response);
		})
		.catch(err => {
			response.status = 500;
			response.message = "Some error occurred while retrieving news.";
			response.error.type = "";
			response.error.message = err.message || "Some error occurred while retrieving news.";
			res.status(response.status).send(response);
		});
};

exports.updateCoolNews = async (req, res) => {
	if (await guardToken.guardToken(req, res)) return false

	const id = req.body.id;

	if (!req.body) {
		response.status = 400;
		response.message = "Invalid data";
		response.error.type = "invalid data";
		response.error.message = "Data to update can not be empty!";
		res.status(response.status).send(response);
	}
	if (!req.body.title) {
		return res.status(400).send({
			status: 400,
			error: {
				type: "Validation error",
				message: "Title is required"
			}
		});
	}
	if (req.body.img && !req.body.img.startsWith(req.protocol + '://' + req.get('host') + '/uploads/')) {
		let name = "coolNews-" + code.generate() + '.jpg';
		let status = uploadImage.uploadFile(name, req.body.img)
		if (status == 500) {
			return res.status(400).send({
				status: 400,
				error: {
					type: "Image error",
					message: "Error with uploading image"
				}
			});
		}
		req.body.img = req.protocol + '://' + req.get('host') + '/uploads/' + name

		CoolNews.findOne({ _id: id }).select('img').then(image => {
			uploadImage.deleteFile(image.img)
		})
	}
	CoolNews.findByIdAndUpdate(
		id,
		{
			title: req.body.title,
			img: req.body.img,
			content: req.body.content,
			isArchived: req.body.isArchived,
		},
		{ useFindAndModify: false }
	)
		.then(data => {
			if (!data) {
				response.status = 404;
				response.message = "Invalid id";
				response.error.type = "invalid id";
				response.error.message = `Cannot update news with id=${id}.`;
				res.status(response.status).send(response);
			} else {
				response.message = 'News was updated successfully.';
				response.result = data;
				response.length = 1;
				res.send(response)
			}
		})
		.catch(err => {
			response.status = 500;
			response.message = "Invalid id";
			response.error.type = "invalid id";
			response.error.message = `Error updating News with id=${id}.`;
			res.status(response.status).send(response);
		});
};
exports.deleteCoolNews = async (req, res) => {
	if (await guardToken.guardToken(req, res)) return false

	const id = req.body.id;

	CoolNews.findByIdAndRemove(id)
		.then(data => {
			if (!data) {
				response.status = 404;
				response.message = "Invalid id";
				response.error.type = "invalid id";
				response.error.message = `Cannot delete news with id=${id}.`;
				res.status(response.status).send(response);
			} else {
				uploadImage.deleteFile(data.img)
				response.message = 'News was deleted successfully!';
				response.length = 1;
				response.result = data;
				res.send(response);
			}
		})
		.catch(err => {
			response.status = 500;
			response.message = "Invalid id";
			response.error.type = "invalid id";
			response.error.message = `Could not delete news with id=${id}.`;
			res.status(response.status).send(response);
		});
};

exports.findCoolNews = (req, res) => {
	if (!req.body.title) {
		return res.status(400).send({
			status: 400,
			error: {
				type: "Validation error",
				message: "Title is required"
			}
		});
	}
	CoolNews.find({
		title: { $regex: new RegExp(`${req.body.title}`, 'i') },
	})
		.then(data => {
			response.message = "Find news successfully!";
			response.result = data;
			response.length = data.length;
			res.send(response);
		})
		.catch(err => {
			response.status = 500;
			response.message = "Not found";
			response.error.type = "Not found";
			response.error.message = `Не вдалось отримати новини.`;
			res.status(response.status).send(response);
		});
};

exports.findByStatus = async (req, res) => {
	if (req.body.isArchived != 0) {
		if (await guardToken.guardToken(req, res)) return false
	}
	CoolNews.find({
		isArchived: req.body.isArchived,
	})
		.then(data => {
			response.message = "Find news by status successfully!";
			response.result = data;
			response.length = data.length;
			res.send(response);
		})
		.catch(err => {
			response.status = 500;
			response.message = "Not found";
			response.error.type = "Not found";
			response.error.message = `Не вдалось отримати новини.`;
			res.status(response.status).send(response);
		});
};
