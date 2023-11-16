const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  trainNo: String,
  coachType: String,
  issueType: String,
  issueLocation: String,
  description: String,
});

module.exports = mongoose.model('Complaint', complaintSchema);
