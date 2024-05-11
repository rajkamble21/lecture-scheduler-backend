const express = require('express');
const { Course, Lecture } = require('../models');
const router = express.Router();


// GET all courses
router.get('/courses', async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a course
router.post('/courses', async (req, res) => {
  try {
    const { name, level, description, imageUrl } = req.body;
    const course = new Course({ name, level, description, imageUrl });
    await course.save();
    res.status(201).json({ message: 'Course added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a course
router.put('/courses/:id', async (req, res) => {
  try {
    const { name, level, description, imageUrl } = req.body;
    await Course.findByIdAndUpdate(req.params.id, { name, level, description, imageUrl });
    res.status(200).json({ message: 'Course updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a course
router.delete('/courses/:id', async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
