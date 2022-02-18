const db = require('../models');
const News = db.news;
const { ObjectId } = require('bson');
const guardToken = require("../middleware/guardToken")
const code = require('../generator/passwordGenerator');
const uploadImage = require('../uploader/uploader');
const api_end_point = process.env.API_ENDPOINT;

let response = {
	status: 200,
	result: null,
	message: null,
	length: 0
}

// Create a new optionsList
exports.create = async (req, res) => {
	if (await guardToken.guardToken(req, res)) return false

	if (!req.body.title) {
		return res.status(400).send({
			status: 400,
			error: {
				type: "Validation error",
				message: "Title is required"
			}
		});
	}

	let name = "news-" + code.generate() + '.jpg';
	let status = uploadImage.uploadFile(name, req.body.main_img)
	if (status == 500) {
		return res.status(400).send({
			status: 400,
			error: {
				type: "Image error",
				message: "Error with uploading image"
			}
		});
	}
console.log(api_end_point)
	const news = new News({
		category: req.body.category,
		title: req.body.title,
		content: req.body.content,
		main_img: api_end_point + '/uploads/' + name,
		created_time: req.body.created_time,
	});
	news
		.save(news)
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

exports.findByCategory = (req, res) => {

	News.find({
		category: req.body.idCategory,
	}).populate('category')
		.then(data => {
			response.length = data.length;
			response.result = data;
			response.message = "Success find news by category"
			res.send(response);
		})
		.catch(err => {
			response.status = 500;
			response.message = "Invalid category id.";
			response.error.type = "Invalid category id";
			response.error.message = "Не вдалось отримати новини за вибраною категорією.";
			res.status(response.status).send(response);
		});
};
exports.findNewsById = (req, res) => {
	News.find({
		_id: req.body.id,

	})
		.then(data => {
			response.length = 1;
			response.result = data[0];
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
	let search = {}
	let skip = 0
	let limit = 0
	if (req.body.category) {
		search = { category: req.body.category }
	}
	if (req.body.page && req.body.limit) {
		skip = req.body.limit * (req.body.page - 1)
		limit = req.body.limit
	}
	let countNews = 0
	News.count(search, (err, count) => {
		countNews = count;
	})
	News.find(search).limit(limit).skip(skip)
		.populate('category').sort({ 'created_time': 'desc' })
		.then(data => {
			response.length = countNews;
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

exports.update = async (req, res) => {
	if (await guardToken.guardToken(req, res)) return false

	if (!req.body) {
		response.status = 500;
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

	const id = req.body.id;

	if (req.body.main_img && !req.body.main_img.startsWith(req.protocol + '://' + req.get('host') + '/uploads/')) {
		let name = "news-" + code.generate() + '.jpg';
		let status = uploadImage.uploadFile(name, req.body.main_img)
		if (status == 500) {
			return res.status(400).send({
				status: 400,
				error: {
					type: "Image error",
					message: "Error with uploading image"
				}
			});
		}
		req.body.main_img = api_end_point + '/uploads/' + name

		News.findOne({ _id: id }).select('main_img').then(image => {
			uploadImage.deleteFile(image.main_img)
		})
	}

	News.findByIdAndUpdate(
		id,
		{
			title: req.body.title,
			category: new ObjectId(req.body.category),
			main_img: req.body.main_img,
			content: req.body.content,
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
exports.deleteNews = async (req, res) => {
	if (await guardToken.guardToken(req, res)) return false
	const id = req.body.id;

	News.findByIdAndRemove(id)
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

exports.counter = (req, res) => {
	const id = req.body.id;
	News.findByIdAndUpdate(req.body.id, { views: req.body.views })
		.then(data => {
			if (!data) {
				response.status = 404;
				response.message = "Invalid id";
				response.error.type = "invalid id";
				response.error.message = `Cannot update newsViews with id=${id}.`;
				res.status(response.status).send(response);
			} else {
				response.message = 'NewsViews was updated successfully';
				response.result = data;
				response.length = 1;
				res.send(response);
			}
		})
		.catch(err => {
			response.status = 500;
			response.message = "Invalid id";
			response.error.type = "invalid id";
			response.error.message = `Error updating NewsViews with id=${id}.`;
			res.status(response.status).send(response);
		});
},

	exports.findNews = (req, res) => {

		if (!req.body.title) {
			return res.status(400).send({
				status: 400,
				error: {
					type: "Validation error",
					message: "Title is required"
				}
			});
		}
		News.find({
			title: { $regex: new RegExp(`${req.body.title}`, "i") }
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

exports.findByStatus = (req, res) => {

	News.find({
		isArchived: req.body.isArchived
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
}

