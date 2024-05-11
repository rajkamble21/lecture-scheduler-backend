const express = require('express');
const multer = require('multer');
const { Course } = require('../models');
const router = express.Router();

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage: storage });


// GET all courses
router.get('/courses', async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET a course by ID
router.get('/courses/:id', async (req, res) => {
  try {
    const courseId = req.params.id;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a course with image upload
router.post('/courses', upload.single('imageUrl'), async (req, res) => {
  try {
    const { name, level, description } = req.body;
    const imageUrl = req.file ? req.file.path : null; // Get the uploaded image path
    const course = new Course({ name, level, description, imageUrl });
    await course.save();
    res.status(201).json({ message: 'Course added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a course with image upload
router.put('/courses/:id', upload.single('imageUrl'), async (req, res) => {
  try {
    const { name, level, description } = req.body;
    const imageUrl = req.file ? req.file.path : null; // Get the uploaded image path
    await Course.findByIdAndUpdate(req.params.id, { name, level, description, imageUrl });
    res.status(200).json({ message: 'Course updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Delete a course by ID
router.delete('/courses/:id', async (req, res) => {
  try {
    const courseId = req.params.id;
    const deletedCourse = await Course.findByIdAndDelete(courseId);
    if (!deletedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
