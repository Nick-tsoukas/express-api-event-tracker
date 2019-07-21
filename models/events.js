const mongoose = require('mongoose');
const commentSchema = require('./comments');

const eventSchema = new mongoose.Schema({
    eventId: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
    },
    title: String,
    description: String,
    comments: [commentSchema],
    coordinates: Array,
    date: Date,
    createdAt: Date
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;