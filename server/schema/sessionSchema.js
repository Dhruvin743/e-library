let mongoose = require("mongoose");
require("dotenv").config();

const sessionSchema = new mongoose.Schema({
	uSess: [
		{
			type: Object,
		},
	],
	expireAt: {
		type: Date,
		expires: eval(process.env.SESS_LIFETIME),
	},
});

module.exports = mongoose.model("session", sessionSchema);
