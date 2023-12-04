const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  empId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true }
});

module.exports = mongoose.model('User', UserSchema);
