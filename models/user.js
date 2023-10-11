const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        username: { type: String, required: true, unique: true }, // Ensured username is unique
        password: { type: String, required: true },
        createdAt: { type: Date, default: Date.now } // Added a timestamp for when the user is created, for better tracking and management
    }
);

module.exports = mongoose.model('User', userSchema);

