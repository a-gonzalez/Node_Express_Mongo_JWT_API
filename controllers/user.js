const express = require("express");
const router = express.Router();

const service = require("../common/services/user");

router.get("/", getUsers);
router.get("/:id", getUser);
router.get("/current", getCurrent);
router.post("/authenticate", authenticate);
router.post("/register", register);
router.put("/:id", update);
router.delete("/:id", remove);

module.exports = router;

function authenticate(request, response, next)
{
	service.authenticate(request.body).then((user) =>
	{
		if (user)
		{
			response.status(200).json(user);
		}
		else
		{
			response.status(400).json({ message: "Authentication failed." });
		}
	}).catch((error) =>
	{
		next(error);
	});
}

function register(request, response, next)
{
	console.info("Processing register request -> %s", request.body.username);

	service.create(request.body).then(() =>
	{
		response.status(200).json({});
	}).catch((error) =>
	{
		next(error);
	});
}

function getUsers(request, response, next)
{
	console.info("Processing get-users request...");

	service.getUsers().then((users) =>
	{
		response.status(200).json(users);
	}).catch((error) =>
	{
		next(error);
	});
}

function getUser(request, response, next)
{
	const id = request.params.id;

	service.getUser(id).then((user) =>
	{
		if (user)
		{
			response.status(200).json(user)
		}
		else
		{
			response.status(404).json({});
		}
	}).catch((error) =>
	{
		next(error);
	});
}

function getCurrent(request, response, next)
{
	const id = request.user.sub;

	service.getUser(id).then((user) =>
	{
		if (user)
		{
			response.status(200).json(user)
		}
		else
		{
			response.status(404).json({});
		}
	}).catch((error) =>
	{
		next(error);
	});
}

function update(request, response, next)
{
	const id = request.params.id;
	const data = request.body;

	service.update(id, data).then(() =>
	{
		response.status(200).json({});
	}).catch((error) =>
	{
		next(error);
	});
}

function remove(request, response, next)
{
	const id = request.params.id;

	service.remove(id).then(() =>
	{
		response.status(200).json({});
	}).catch((error) =>
	{
		next(error);
	});
}