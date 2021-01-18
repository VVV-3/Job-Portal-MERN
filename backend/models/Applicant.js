const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ApplicantSchema = new Schema ({
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
    education: [
        {
            instituteName: {
                type: String,
                required: true,
                trim: true,
                maxlength: [300, "Character limit exceeded!"]
            },
            startYear: {
                type: Date,
                required: true
            },
            endYear: {
                type: Date
            }
        },
    ],
    skills: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Skills"
        },
    ],
    rating: {
        numerator: {
            type: Number,
            min: 0,
            default: 0
        },
        denominator: {
            type: Number,
            min: 0,
            default: 0
        }
    },
    date:{
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model("Applicants", ApplicantSchema);