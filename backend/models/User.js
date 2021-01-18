const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
	jobType: {
		type: String,
		required: true,
		trim: true,
		enum: ['applicant', 'recruiter']
	},
	email: {
		type: String,
		required: true,
		trim: true,
		validate: {
			validator: v => /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(v),
			message: "enter proper email dumbass!"
		}
    },
    password: {
		type: String,
		minlength: [8,'Password needs to be atleast 8 characters long'],
        required: true
    },
	date:{
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model("Users", UserSchema);