const mongoose = require('mongoose');

const lectureSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'Instructor', required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
});

const Lecture = mongoose.model('Lecture', lectureSchema);

module.exports = Lecture;
