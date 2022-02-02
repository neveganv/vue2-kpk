const db = require("../models");
const Specialty = db.specialty


// Create a new specialty
exports.create = (req, res) => {
    console.log("req",req.body);
      const specialty = new Specialty({
          name: req.body.name,
          img: req.body.img,
          content: req.body.content,
          courses: req.body.courses,
          number: req.body.number
      });
   
    specialty
        .save(specialty)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the specialty."
            });
        });

};

exports.findAll = (req, res) => {
     Specialty.find()
     .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the specialty."
        });
    });
};
exports.findById = (req, res) => {  
    Specialty.find({_id: req.body.id})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving blogs."
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
	Specialty.findByIdAndUpdate(
		id,
		{
            name: req.body.name,
            img: req.body.img,
            number: req.body.number,
            content: req.body.content,
            courses: req.body.courses
		},
		{ useFindAndModify: false }
	)
		.then(data => {
			if (!data) {
				res.status(404).send({
					message: `Cannot update specialty with id=${id}.`,
				});
			} else res.send({ message: 'Specialty was updated successfully.' });
		})
		.catch(err => {
			res.status(500).send({
				message: 'Error updating specialty with id=' + id,
			});
		});
}

exports.findSpecialty = (req, res) => {
	Specialty.find({
		name:{ $regex : new RegExp(`${req.body.title}`, "i") }
	})
		.then(data1 => {
      const data = data1;
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: 'Не вдалось отримати новини.',
			});
		});
};

exports.deleteSpecialty = (req, res) => {
  const id = req.body.id;

    Specialty.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete specialty with id=${id}.`
          });
        } else {
          res.send({
            message: "Specialty was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete specialty with id=" + id
        });
      });
}