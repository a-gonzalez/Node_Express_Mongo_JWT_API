const express = require("express");
const app = express();

app.use(express.static("public"));

const parser = require("body-parser");

app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

const jwt = require("./common/jwt");

app.use(jwt());

const path = require("path");

app.get("/", (request, response) =>
{
	console.log("Serving index.html @ %s", new Date().toLocaleString());

	response.sendFile(path.join(__dirname, "public", "html/tester.html"));
});

app.use("/user", require("./controllers/user"));

app.use(require("./common/error-handler"));

const color = require("chalk");

const config = require("./common/config/config.json");

app.listen(config.port, () =>
{
	console.info(color.blue(`\nServer is running on port: ${config.port}\n`));
});