const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ApplicationSchema = new Schema({
    jobOpening: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Job Opening'
    },
    applicant: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Applicant'
    },
    sop: {
        type: String,
        required: true,

    },
    validate: {
        validator: (msg) => msg.split(" ").length <= 250,
        message: "Word limit exceeded!",
    },
    state: {
        type: String,
        required: true,
        trim: true,
        enum: ["applied", "rejected", "shortlisted", "accepted"],
        default: "applied",
    }
});

module.exports = mongoose.model('Applications', ApplicationSchema);