const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	uEmail: {
		type: String,
		required: true,
		unique: true,
	},
	uPass: {
		type: String,
		required: true,
	},
	uBooks: [
		{
			book_id: String,
			bCover: [Number],
			bTitle: String,
			bDescription: String,
			bIsMarked: {
				type: Boolean,
				default: false,
			},
			bIsFavorite: {
				type: Boolean,
				default: false,
			},
			bIsRented: {
				type: Boolean,
				default: false,
			},
			bExpire: Date,
		},
	],
});

const userModel = mongoose.model("user", userSchema);
module.exports = { userModel };
