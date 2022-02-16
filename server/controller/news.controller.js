const db = require('../models');
const News = db.news;
const { ObjectId } = require('bson');
const guardToken = require("../middleware/guardToken")
const code = require('../generator/passwordGenerator');
const uploadImage = require('../uploader/uploader');

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

	const news = new News({
		category: req.body.category,
		title: req.body.title,
		content: req.body.content,
		main_img: req.protocol + '://' + req.get('host') + '/uploads/' + name,
		created_time: req.body.created_time,
	});
	news
		.save(news)
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || 'Some error occurred while creating the news.',
			});
		});
};

exports.findByCategory = (req, res) => {

	News.find({
		category: req.body.idCategory,
	}).populate('category')
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: 'Не вдалось отримати новини за вибраною категорією.',
			});
		});
};
exports.findNewsById = (req, res) => {
	News.find({
		_id: req.body.id,

	})
		.then(data => {
			res.send(data);
		})
		.catch(err => {
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
			let body = {}
			body.result = data
			body.length = countNews
			res.send(body);
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || 'Some error occurred while retrieving blogs.',
			});
		});
};

exports.update = async (req, res) => {
	if (await guardToken.guardToken(req, res)) return false

	if (!req.body) {
		return res.status(400).send({
			message: 'Data to update can not be empty!',
		});
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
		req.body.main_img = req.protocol + '://' + req.get('host') + '/uploads/' + name

		News.findOne({_id: id}).select('main_img').then(image => {
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
				res.status(404).send({
					message: `Cannot update news with id=${id}.`,
				});
			} else res.send({ message: 'News was updated successfully.' });
		})
		.catch(err => {
			res.status(500).send({
				message: 'Error updating News with id=' + id,
			});
		});
};
exports.deleteNews = async (req, res) => {
	if (await guardToken.guardToken(req, res)) return false
	const id = req.body.id;

	News.findByIdAndRemove(id)
		.then(data => {
			if (!data) {
				res.status(404).send({
					message: `Cannot delete news with id=${id}.`
				});
			} else {
				uploadImage.deleteFile(data.main_img)
				res.send({
					message: "News was deleted successfully!"
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: "Could not delete news with id=" + id
			});
		});

};

exports.counter = (req, res) => {
	const id = req.body.id;
	News.findByIdAndUpdate(req.body.id, { views: req.body.views })
		.then(data => {
			if (!data) {
				res.status(404).send({
					message: `Cannot update newsViews with id=${id}.`,
				});
			} else res.send({ message: 'newsViews was updated successfully.' });
		})
		.catch(err => {
			res.status(500).send({
				message: 'Error updating newsViews with id=' + id,
			});
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
				res.send(data);
			})
			.catch(err => {
				res.status(500).send({
					message: 'Не вдалось отримати новини.',
				});
			});
	};

exports.findByStatus = (req, res) => {

	News.find({
		isArchived: req.body.isArchived
	})
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: 'Не вдалось отримати новини.',
			});
		});
}

