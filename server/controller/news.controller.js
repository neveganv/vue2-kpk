const db = require('../models');
const News = db.news;
const { ObjectId } = require('bson');

// Create a new optionsList
exports.create = (req, res) => {
	const news = new News({
		category: req.body.category,
		title: req.body.title,
		content: req.body.content,
		main_img: req.body.main_img,
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
		idCategory: req.params.id,
	})
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: 'Не вдалось отримати новини за вибраною категорією.',
			});
		});
};

exports.findAll = (req, res) => {
	News.find()
		.populate('category')
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || 'Some error occurred while retrieving blogs.',
			});
		});
};

exports.update = (req, res) => {
	if (!req.body) {
		return res.status(400).send({
			message: 'Data to update can not be empty!',
		});
	}
	const id = req.body.id;
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
