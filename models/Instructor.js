const mongoose = require('mongoose');

const instructorSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
});

const Instructor = mongoose.model('Instructor', instructorSchema);

module.exports = Instructor;
