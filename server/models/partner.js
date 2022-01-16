module.exports = mongoose => {
	const { Schema } = mongoose;
	const page = mongoose.model(
		'page',
		mongoose.Schema({
            path_img: {
				type: String,
				require: true,
			},
            path_link: {
				type: String,
				require: true,
			},
			partner_name: {
				type: String,
				require: true,
			},
		})
	);
	return page;
};
