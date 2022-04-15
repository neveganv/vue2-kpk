const db = require('../../models');
const Event = db.shedul;
const { ObjectId } = require('bson');
const { classes } = require('../../models');
const guardToken = require("../../middleware/guardToken")

let response = {
	status: 200,
	result: null,
	message: null,
	length: 0
}

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
	if (!req.body.class) {
		validateError.error.message = "Class is required";
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

exports.copySchedule = async (req, res) => {
	if (await guardToken.guardToken(req, res)) return false
	// var date1 = new Date(req.query.start);
	// var date2 = new Date(req.query.end);

	// // To calculate the time difference of two dates
	// var difference_time = date2.getTime() - date1.getTime();

	// // To calculate the no. of days between two dates
	// var difference_days = difference_time / (1000 * 3600 * 24);
	// console.log(difference_days)

	Event.find({
		group: req.query.group,
		start: {
			$gte: req.query.start + ' 00:00',
			$lte: req.query.end + ' 23:59'
		}
	})
		.populate('group')
		.populate('classes')
		.then((data) => {
			let newEvents = []
			for (let i = 0; i < data.length; i++) {
				var time_start = data[i].start.split(' ')
				var time_end = data[i].end.split(' ')

				var date_start = new Date(time_start[0])
				date_start.setDate(date_start.getDate() + 7)

				var date_end = new Date(time_end[0])
				date_end.setDate(date_end.getDate() + 7)

				console.log(data[i]._id.toString())

				console.log(date_start.toISOString().slice(0, 10) + " " + time_start[1])
				console.log(date_end.toISOString().slice(0, 10) + " " + time_end[1])

				let event = new Event({
					name: data[i].name,
					group: data[i].group,
					link: data[i].link,
					start: date_start.toISOString().slice(0, 10) + " " + time_start[1],
					color: data[i].color,
					end: date_end.toISOString().slice(0, 10) + " " + time_end[1],
					content: data[i].content,
					classes: data[i].classes,
				});

				if (parseInt(req.query.save)) {
				//Save copied events to database
					event
						.save(event)
				}
				if (parseInt(req.query.delete)) {
					Event.find({_id : data[i]._id.toString()}).remove().exec()
				}
				newEvents.push(event)
			}
			response.length = newEvents.length;
			response.result = newEvents;
			response.message = "Successfully copied events"
			res.send(response);
		}).catch(err => {
			response.status = 500;
			response.message = "Server error";
			response.error.type = "Server error";
			response.error.message = "Server error";
			res.status(response.status).send(response);
		});
}

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


// delete event by id
exports.deleteEvent = async (req, res) => {
	if (await guardToken.guardToken(req, res)) return false

	const id = req.params.id;
	Event.findByIdAndRemove(id)
		.then(data => {
			if (!data) {
				response.status = 404;
				response.message = "Not found";
				response.error.type = "Not found";
				response.error.message = `Cannot delete event with id=${id}. Maybe folder was not found!`;
				res.status(response.status).send(response);
			} else {
				response.status = 200;
				response.message = 'Event was deleted successfully!';
				response.length = 1;
				response.result = data;
				res.send(response);
			}
		})
		.catch(err => {
			response.status = 500;
			response.message = "Invalid id";
			response.error.type = "invalid id";
			response.error.message = `Could not delete event with id=${id}.`;
			res.status(response.status).send(response);
		});

};

