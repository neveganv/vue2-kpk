module.exports = mongoose => {
	const { Schema } = mongoose;
	const partner = mongoose.model(
		'partner',
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
	return partner;
};
