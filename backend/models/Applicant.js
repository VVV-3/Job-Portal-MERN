const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ApplicantSchema = new Schema({
	email: {
		type: String,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    education: [
        {
            InstituteName: {
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
            ref: "Skill"
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