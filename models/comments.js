const mongoose = require('mongoose');
const commentSchema = mongoose.Schema({
    title: String,
    content: String
});

module.exports = commentSchema;