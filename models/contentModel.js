const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    roleAccess: [{ type: String, enum: ['Admin', 'Moderator', 'User'], required: true }],
    data: mongoose.Schema.Types.Mixed, // Flexible field to store varied content
});

const Content = mongoose.model('Content', contentSchema);

module.exports = Content;
