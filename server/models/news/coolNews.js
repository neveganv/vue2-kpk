module.exports = mongoose => {
	const { Schema } = mongoose;
	const coolNews = mongoose.model(
		'coolNews',
		mongoose.Schema({
			title: {
				type: String,
				require: true,
			},
			img: {
				type: String,
				require: true,
			},
			created_time: {
				type: String,
				require: true,
			},
		})
	);
	return coolNews;
};
