const config = require("../common/config/config.json");
const mongoose = require("mongoose");

mongoose.connect(config.connection, { useCreateIndex: true, useNewUrlParser: true });
mongoose.Promise = global.Promise;

const user = require("./models/user");

module.exports = { User: user};