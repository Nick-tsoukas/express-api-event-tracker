const mongoose = require('mongoose');
const commentSchema = require('./comments');

const eventSchema = new mongoose.Schema({
    eventId: String,
    type: String,
    title: String,
    description: String,
    comments: [commentSchema],
    coordinates: Array,
    date: Date
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;