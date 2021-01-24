const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ApplicationSchema = new Schema({
    jobOpening: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'JobOpenings'
    },
    applicant: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Applicants'
    },
    sop: {
        type: String,
        required: true,
        validate: {
            validator: (msg) => msg.split(" ").length <= 250,
            message: "Word limit exceeded!",
        }
    },
    doj: {
        type:Date,
        default: null
    },
    doa: {
        type: Date,
        default : Date.now
    },
    state: {
        type: String,
        required: true,
        trim: true,
        enum: ["applied", "rejected", "shortlisted", "accepted","selected"],
        default: "applied",
    }
});

module.exports = mongoose.model('Applications', ApplicationSchema);