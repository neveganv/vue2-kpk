module.exports = mongoose => {
	const { Schema } = mongoose;
	const prepareCourse = mongoose.model(
		'prepareCourse',
		mongoose.Schema({
			name: {
				type: String,
				require: true,
			},
			surname: {
				type: String,
				require: true,
			},
			middle_name: {
				type: String,
				require: true,
			},
			parent_phone: {
				type: String,
				require: true,
			},
			student_phone: {
				type: String,
				require: true,
			},
			created: {
				type: Date,
				default: Date.now()
			},
            pass_id: {
                type: String,
				require: true,
            },
			status: {
                type: String,
				default: 'Новий',
            }
		})
	);
	return prepareCourse;
};
