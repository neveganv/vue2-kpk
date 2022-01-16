module.exports = mongoose => {
	const { Schema } = mongoose;
	const page = mongoose.model(
		'page',
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
            pass_id: {
                type: String,
				require: true,
            }
		})
	);
	return page;
};
