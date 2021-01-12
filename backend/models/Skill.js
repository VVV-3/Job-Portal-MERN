const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const SkillSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: [150, 'Character limit exceeded!']
    }
});

module.exports = mongoose.model('Skills', SkillSchema);