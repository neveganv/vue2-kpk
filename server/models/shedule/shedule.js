module.exports = mongoose => {
	const { Schema } = mongoose;
	const shedule = mongoose.model(
		'shedule',
		mongoose.Schema({
			name: {
				type: String,
				require: true,
			},
			group: {
				type: Schema.Types.ObjectId,
				ref: 'group',
			},
			classes: {
				type: Schema.Types.ObjectId,
				ref: 'classes',
			},
			link: {
				type: String,
				require: false,
			},
			color: {
				type: String,
				require: true,
			},
			start: {
				type: String,
				require: true,
			},
			end: {
				type: String,
				require: true,
			},
			content: {
				type: String,
				require: false,
			},
		})
	);
	return shedule;
};
