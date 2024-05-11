const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, Instructor } = require('../models');
const router = express.Router();

// Get all instructors
router.get('/instructors', async (req, res) => {
  try {
    const instructors = await Instructor.find().populate('user', 'username password role');
    res.status(200).json(instructors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Get an instructor by ID
router.get('/instructors/:id', async (req, res) => {
  try {
    const instructor = await Instructor.findById(req.params.id).populate('user', 'username password role');
    if (!instructor) {
      return res.status(404).json({ message: 'Instructor not found' });
    }
    res.status(200).json(instructor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add an instructor
router.post('/instructors', async (req, res) => {
  try {
    const { username, password, name, email } = req.body;

    // Check if username is already taken
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username is already taken' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({ username, password: hashedPassword, role: 'Instructor' });
    await user.save();

    // Create a new instructor and link it to the user
    const instructor = new Instructor({ user: user._id, name, email });
    await instructor.save();

    res.status(201).json({ message: 'Instructor added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update an instructor
router.put('/instructors/:id', async (req, res) => {
  try {
    const { name, email } = req.body;
    await Instructor.findByIdAndUpdate(req.params.id, { name, email });
    res.status(200).json({ message: 'Instructor updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete an instructor
router.delete('/instructors/:id', async (req, res) => {
  try {
    const instructor = await Instructor.findById(req.params.id);
    if (!instructor) {
      return res.status(404).json({ message: 'Instructor not found' });
    }
    await User.findByIdAndDelete(instructor.user);
    await Instructor.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Instructor deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
