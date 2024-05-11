const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String },
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
