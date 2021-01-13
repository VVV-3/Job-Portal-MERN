const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const JobOpeningSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: [300,'Character limit exceeded!']
    },
    recruiter: {
        type: Schema.Types.ObjectId,
        ref: 'Recruiters'
    },
    maxApplicants: {
        type: Number,
        required: true,
        min: 0
    },
    maxPositions: {
        type: Number,
        required: true,
        min: 0
    },
    postingDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    deadline: {
        type: Date,
        required: true
    },
    skills: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Skills'
        }
    ],
    jobType: {
        type: String,
        required: true,
        trim: true,
        enum: ["full_time", "part_time", "work_from_home"]
    },
    duration: {
        type: Number,
        required: true,
        min: 0,
        max: 6
    },
    salary: {
        type: Number,
        required: true,
        min: 0
    },
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
    state: {
        type: String,
        required: true,
        trim: true,
        enum: ["open","filled","closed"],
        default: "open",
    },
    date:{
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('JobOpenings', JobOpeningSchema);