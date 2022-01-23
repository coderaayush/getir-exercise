const mongoose = require('mongoose');

const recordsSchema = new mongoose.Schema({
    key: {
        type: String
    },
    value: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    counts: {
        type: Array
    }
});

module.exports = mongoose.model('records', recordsSchema);