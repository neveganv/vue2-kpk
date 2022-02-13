const db = require('../models');
const User = db.user;

function guardToken(req, res) {
	const tokenHeader = req.headers.authorization;
	const TOKEN_SALT = 'eVhfwAhfwDfewuIfenwKbfuweLfbewiefOfejbwOefwuknqdX';
	if (
		tokenHeader &&
		tokenHeader.startsWith('Bearer ') &&
		tokenHeader.includes(TOKEN_SALT)
	) {
		const decodeToken = tokenHeader.split(' ')[1].replace(TOKEN_SALT, '');
		User.findOne({ token: decodeToken }, function (err, user) {
			if (!user) {
				return res.status(401).send({
					statusCode: 401,
					error: {
						type: 'User Not Foud',
						description: 'Користувача не знайдено',
					},
				});
			}
		});
	} else {
		return res.status(401).send({
			statusCode: 401,
			error: {
				type: 'UNAUTHENTICATED',
				description: 'Вийди звідси, розбійнику',
				link: 'https://memegenerator.net/img/instances/72036758/dont-hack-me-im-innocent.jpg',
			},
		});
	}
}

module.exports = { guardToken };
