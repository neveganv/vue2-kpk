const db = require('../../models');
const Event = db.shedul;
const { ObjectId } = require('bson');
const { classes } = require('../../models');
const guardToken = require("../../middleware/guardToken")

// Create a new Event
exports.create = (req, res) => {
	if(guardToken.guardToken(req,res)) return  false

	const event = new Event({
		name: req.body.class,
		group: req.body.group,
		link: req.body.link,
		start: req.body.start,
		color: req.body.color,
		end: req.body.end,
		content: req.body.content,
		classes: req.body.classId,
	});

	// Save Event in the database
	event
		.save(event)
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || 'Some error occurred while creating the order.',
			});
		});
};

exports.findByGroup = (req, res) => {
	Event.find({
		group: req.body.group,
	})
		.populate('group')
		.populate('classes')

		.then(data => {
			res.send(data);
			console.log(data);
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || 'Some error occurred while retrieving blogs.',
			});
		});
};

exports.findEventById = (req, res) => {
	Event.find({
		_id: req.body.id,
	})
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: 'Не вдалось отримати пару за вибраним ід.',
			});
		});
};

exports.updateEvent = (req, res) => {
	if(guardToken.guardToken(req,res)) return  false

	if (!req.body) {
		return res.status(400).send({
			message: 'Data to update can not be empty!',
		});
	}
	const id = req.body.id;
	const event = req.body;
	Event.findByIdAndUpdate(
		id,
		{ event, 
			group: new ObjectId(req.body.group),
			name: req.body.class,
			link: req.body.link,
			start: req.body.start,
			color: req.body.color,
			end: req.body.end,
			content: req.body.content,
			classes: new ObjectId(req.body.classId),

		 },
		{ useFindAndModify: false }
	)
		.then(data => {
			if (!data) {
				res.status(404).send({
					message: `Cannot update event with id=${id}.`,
				});
			} else res.send({ message: 'Event was updated successfully.' });
		})
		.catch(err => {
			res.status(500).send({
				message: 'Error updating event with id=' + id,
			});
		});
};
