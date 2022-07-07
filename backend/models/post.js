const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    id: { type: String },
    name: { type: String, required: true },
    price: { type: String, required: true }
});

module.exports = mongoose.model('Post', postSchema);