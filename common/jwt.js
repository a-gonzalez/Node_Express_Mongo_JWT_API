const ejwt = require("express-jwt");

const config = require("../common/config/config.json");
const service = require("../common/services/user");

module.exports = jwt;

function jwt()
{
	const secret = config.secret;

	return ejwt({ secret, isRevoked }).unless({
		path: [
			"/",
			"/user/authenticate",
			"/user/register"
		]
	});
}

async function isRevoked(request, payload, done)
{
	const id = payload.sub;
	const user = await service.getUser(id);

	if (!user)
	{
		return done(null, true);
	}
	done();
}