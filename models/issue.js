const mongoose = require('mongoose');

const issueSchema = mongoose.Schema({
    id: { type: String, unique: true },  // Removed 'required: true'
    title: { type: String, required: true },
    description: { type: String, required: true },
    datePosted: { type: Date, default: Date.now }, 
    department: { type: String, required: true }
});

module.exports = mongoose.model('Issue', issueSchema);
