const db = require('../../models');
const Event = db.shedul;
const { ObjectId } = require('bson');
const { classes } = require('../../models');
const guardToken = require("../../middleware/guardToken")

// Create a new Event
exports.create = async (req, res) => {
	if (await guardToken.guardToken(req, res)) return false

	let validateError = {
		status: 400,
		error: {
			type: "Validation error",
			message: "",
		}
	};
	if (!req.body.name) {
		validateError.error.message = "Name is required";
		return res.status(400).send(validateError);
	}
	else if (!req.body.color) {
		validateError.error.message = "Color is required";
		return res.status(400).send(validateError);
	}
	else if (!req.body.start) {
		validateError.error.message = "Start time is required";
		return res.status(400).send(validateError);
	}
	else if (!req.body.end) {
		validateError.error.message = "End time is required";
		return res.status(400).send(validateError);
	}

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
			response.length = 1;
			response.result = data;
			response.message = "Success create shedule"
			res.send(response);
		})
		.catch(err => {
			response.status = 500;
			response.message = "Some error occurred while creating the shudule.";
			response.error.type = "";
			response.error.message = err.message || "Some error occurred while creating the shedule.";
			res.status(response.status).send(response);
		});
};

exports.findByGroup = (req, res) => {
	if (!req.body.group) {
		return res.status(400).send({
			status: 400,
			error: {
				type: "Validation error",
				message: "Group is required"
			}
		});
	}
	Event.find({
		group: req.body.group,
	})
		.populate('group')
		.populate('classes')

		.then(data => {
			response.length = data.length;
			response.result = data;
			response.message = "Success get shedule of gruops"
			res.send(response);
		})
		.catch(err => {
			response.status = 500;
			response.message = "Some error occurred while retrieving blogs.";
			response.error.type = "";
			response.error.message = err.message || "Some error occurred while retrieving blogs.";
			res.status(response.status).send(response);
		});
};

exports.findEventById = (req, res) => {
	if (!req.body.id) {
		return res.status(400).send({
			status: 400,
			error: {
				type: "Validation error",
				message: "ID is required"
			}
		});
	}
	Event.find({
		_id: req.body.id,
	})
		.then(data => {
			response.length = 1;
			response.result = data;
			response.message = "Success find event by id"
			res.send(response);
		})
		.catch(err => {
			response.status = 500;
			response.message = "Invalid id";
			response.error.type = "Invalid id";
			response.error.message = "Не вдалось отримати пару за вибраним ід.";
			res.status(response.status).send(response);
		});
};

exports.updateEvent = async (req, res) => {
	if (await guardToken.guardToken(req, res)) return false

	if (!req.body) {
		return res.status(400).send({
			message: 'Data to update can not be empty!',
		});
	}
	const id = req.body.id;
	const event = req.body;
	Event.findByIdAndUpdate(
		id,
		{
			event,
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
				response.status = 404;
				response.message = "Invalid id";
				response.error.type = "invalid id";
				response.error.message = `Cannot updateevent with id=${id}.`;
				res.status(response.status).send(response);
			} else {
				response.message = 'Event was updated successfully.';
				response.result = data;
				response.length = 1;
				res.send(response)
			}
		})
		.catch(err => {
			response.status = 500;
			response.message = "Invalid id";
			response.error.type = "invalid id";
			response.error.message = `Error updating Event with id=${id}.`;
			res.status(response.status).send(response);
		});
};
