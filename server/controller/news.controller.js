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
exports.deleteNews = (req,res) => {
    const id = req.body.id;

    News.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete news with id=${id}.`
          });
        } else {
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
	console.log("id: ", req.body.id);
	const id = req.body.id;
	News.findByIdAndUpdate(req.body.id, {views: req.body.views})
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
	News.find({
		title:  {$regex: req.body.title}
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
