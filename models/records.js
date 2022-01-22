const mongoose = require('mongoose');

const recordsSchema = new mongoose.Schema();

module.exports = mongoose.model('records', recordsSchema);