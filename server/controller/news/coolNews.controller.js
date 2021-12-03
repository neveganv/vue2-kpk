const db = require('../../models');
const CoolNews = db.coolNews;

// Create a new news
exports.create = (req, res) => {
	console.log("coolNews",req.body)
	const coolNews = new CoolNews({
		title: req.body.title,
		img: req.body.img,
		created_time: req.body.created_time,
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
	CoolNews.find()
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || 'Some error occurred while retrieving blogs.',
			});
		});
};

exports.updateCoolNews = (req, res) => {
	if (!req.body) {
		return res.status(400).send({
			message: 'Data to update can not be empty!',
		});
	}
	const id = req.body.id;
	CoolNews.findByIdAndUpdate(
		id,
		{
			title: req.body.title,
			img: req.body.img,
     	   
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
exports.deleteCoolNews = (req,res) => {
    const id = req.body.id;

    CoolNews.findByIdAndRemove(id)
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