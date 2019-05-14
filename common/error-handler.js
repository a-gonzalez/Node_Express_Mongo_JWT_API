module.exports = (error, request, response, next) =>
{
	if (typeof(error) === "string")
	{
		return response.status(400).json({ message: error });
	}

	if (error.name === "ValidationError")
	{
		return response.status(400).json({ message: error.message });
	}

	if (error.name === "UnauthorizedError")
	{
		return response.status(401).json({ message: error.message });
	}
	return response.status(500).json({ message: error.message });
};