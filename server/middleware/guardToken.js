const db = require('../models');
const User = db.user;

async function guardToken(req, res) {
	const tokenHeader = req.headers.authorization;
	const TOKEN_SALT = 'eVhfwAhfwDfewuIfenwKbfuweLfbewiefOfejbwOefwuknqdX';

	if (
		tokenHeader &&
		tokenHeader.startsWith('Bearer ') &&
		tokenHeader.includes(TOKEN_SALT) &&
		!tokenHeader.includes('null')
	) {
		const decodeToken = tokenHeader.split(' ')[1].replace(TOKEN_SALT, '');
		const newUSer = await User.find({ token: decodeToken });
		if (!newUSer.length) {
			alarm(req,'100')
			return res.status(401).send({
				statusCode: 401,
				error: {
					type: 'User Not Foud',
					description: 'Користувача не знайдено',
				},
			});
		}
		alarm(req,'101')
	} else {
		alarm(req,'102')
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
function alarm(req,type){
	const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	console.log('--------------------------------------')
	console.log('/\n/\n/\n/\n/\n/\n/\n/\n/\n/\n/\n-ip-',ip,'\n');
	console.log('-userAGENT-',req.headers,'\n');
	console.log('-type-',type,'\n');
	console.log('-request-',req.originalUrl,'\n/\n/\n/\n/\n/\n/\n/\n/\n/\n/\n');
	console.log('--------------------------------------')
}
module.exports = { guardToken };
