const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const model = {
	username: {
		type: String,
		unique: true,
		require: true
	},
	hash: {
		type: String,
		require: true
	},
	firstname: {
		type: String,
		require: true
	},
	lastname: {
		type: String,
		require: true
	},
	epoch: {
		type: Date,
		default: Date.now
	}
};

const schema = new Schema(model);
schema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("User", schema);