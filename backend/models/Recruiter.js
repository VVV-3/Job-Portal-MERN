const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const RecruiterSchema = new Schema({
	email: {
		type: String,
        required: true,
        trim: true,
		validate: {
			validator: v => /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(v),
			message: "enter proper email dumbass!"
		}
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    contactNo: {
        type: Number,
        required: true,
        min: 0
    },
    bio: {
        type: String,
        required: true,
        validate: {
            validator: (msg) => msg.split(" ").length <= 250,
            message: "Bio can not exceed 250 words!"
        }
    },
    date:{
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model("Recruiters", RecruiterSchema);