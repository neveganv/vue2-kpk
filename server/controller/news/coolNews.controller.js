const db = require('../../models');
const CoolNews = db.coolNews;
const guardToken = require('../../middleware/guardToken');

// Create a new news
exports.create = async(req, res) => {
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

	const coolNews = new CoolNews({
		title: req.body.title,
		img: req.body.img,
		created_time: req.body.created_time,
		content: req.body.content,
	});
	coolNews
		.save(coolNews)
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || 'Some error occurred while creating the news.',
			});
		});
};

exports.findCoolNewsById = (req, res) => {
	CoolNews.find({
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
	let search = {};
	if (req.body.status == 'available') {
		search = { isArchived: 0 };
	} else if (req.body.status == 'archived') {
		search = { isArchived: 1 };
	}
	CoolNews.find(search)
		.sort({ created_time: 'desc' })
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || 'Some error occurred while retrieving blogs.',
			});
		});
};

exports.updateCoolNews = async(req, res) => {
	if(await guardToken.guardToken(req,res)) return  false

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
exports.deleteCoolNews = async(req, res) => {
	if(await guardToken.guardToken(req,res)) return  false

	const id = req.body.id;

	CoolNews.findByIdAndRemove(id)
		.then(data => {
			if (!data) {
				res.status(404).send({
					message: `Cannot delete news with id=${id}.`,
				});
			} else {
				res.send({
					message: 'News was deleted successfully!',
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: 'Could not delete news with id=' + id,
			});
		});
};

exports.findCoolNews = (req, res) => {
	CoolNews.find({
		title: { $regex: new RegExp(`${req.body.title}`, 'i') },
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

exports.findByStatus = async(req, res) => {
	if(req.body.isArchived != 0){
		if(await guardToken.guardToken(req,res)) return  false
	}
	CoolNews.find({
		isArchived: req.body.isArchived,
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
