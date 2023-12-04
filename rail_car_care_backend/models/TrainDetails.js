const mongoose = require('mongoose');

const trainDetailsSchema = new mongoose.Schema({
  traintype: String,
  coach: [{
    type: String,
    compartment: [String]
  }],
  location: [String],
  service: [{
    type: String,
    issue: [String]
  }]
});

module.exports = mongoose.model('TrainDetails', trainDetailsSchema);
