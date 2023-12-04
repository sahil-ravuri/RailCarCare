const mongoose = require('mongoose');

const trainSchema = new mongoose.Schema({
  trainNo: String,
  trainType: String
});

module.exports = mongoose.model('Trains', trainSchema);
