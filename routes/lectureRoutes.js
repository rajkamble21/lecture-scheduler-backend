const express = require('express');
const { Lecture, Instructor } = require('../models');
const router = express.Router();


// GET all lectures
router.get('/lectures', async (req, res) => {
  try {
    const lectures = await Lecture.find();
    res.status(200).json(lectures);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a lecture
router.post('/lectures', async (req, res) => {
  try {
    console.log(req.body);
    const { courseId, instructorId, date, time } = req.body;

    
    // Check if the instructor is available on the specified date
    const instructor = await Instructor.findById(instructorId);
    const existingLecture = await Lecture.findOne({ instructor: instructorId, date });
    if (existingLecture) {
      return res.status(400).json({ message: 'Instructor already has a lecture on this date' });
    }

    const lecture = new Lecture({ course: courseId, instructor: instructorId, date, time });
    await lecture.save();
    res.status(201).json({ message: 'Lecture added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a lecture
router.put('/lectures/:id', async (req, res) => {
  try {
    const { courseId, instructorId, date, time } = req.body;

    // Check if the instructor is available on the specified date
    const instructor = await Instructor.findById(instructorId);
    const existingLecture = await Lecture.findOne({ instructor: instructorId, date, _id: { $ne: req.params.id } });
    if (existingLecture) {
      return res.status(400).json({ message: 'Instructor already has a lecture on this date' });
    }

    await Lecture.findByIdAndUpdate(req.params.id, { course: courseId, instructor: instructorId, date, time });
    res.status(200).json({ message: 'Lecture updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a lecture
router.delete('/lectures/:id', async (req, res) => {
  try {
    await Lecture.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Lecture deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
