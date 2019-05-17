const jwt = require("jsonwebtoken");
const crypto = require("bcrypt");

const config = require("../config/config.json");
const db = require("../db");
const User = db.User;

module.exports = {
	authenticate,
	getUsers,
	getUser,
	create,
	update,
	remove
};

async function authenticate({ username, password })
{// https://www.npmjs.com/package/jsonwebtoken#errors--codes
	const user = await User.findOne({ username });

	if (user && crypto.compareSync(password, user.hash))
	{
		const { hash, ...xxxx } = user.toObject();
		const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: config.duration });

		return {
			...xxxx,
			token
		};
	}
}

async function getUsers()
{
	return await User.find().select("-hash");
}

async function getUser(id)
{
	return await User.findById(id).select("-hash");
}

async function create(data)
{
	if (await User.findOne({ username: data.username }))
	{
		throw `Username: "${data.username}" is already taken.`;
	}

	const user = new User(data);

	if (data.password)
	{
		user.hash = crypto.hashSync(data.password, 10);
	}

	await user.save();
}

async function update(id, data)
{
	const user = User.findById(id);

	if (!user)
	{
		throw "User was not found.";
	}

	if (user.username !== data.username && await User.findOne({ username: data.username }))
	{
		throw `Username: "${data.username}" is already taken.`;
	}

	if (data.password)
	{
		data.hash = crypto.hashSync(data.password, 10);
	}

	Object.assign(user, data);

	await user.save();
}

async function remove(id)
{
	await User.findByIdAndDelete(id);
}
