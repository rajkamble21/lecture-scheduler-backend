require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authRoutes = require('./routes/authRoutes');
const instructorRoutes = require('./routes/instructorRoutes');
const lectureRoutes = require('./routes/lectureRoutes');
const courseRoutes = require('./routes/courseRoutes');
const cors = require('cors');


const { verifyToken } = require('./middleware/authMiddleware');


const app = express();
const PORT = process.env.PORT || 4000;


// Serve static files from the 'uploads' directory
app.use(express.static('uploads'));

app.use(cors({
  origin: '*', 
  optionsSuccessStatus: 200 
}));

app.use(express.json());

app.get("/protected", verifyToken, (req, res) => {
  res.status(200).send("Welcome to the protected route");
});

app.use('/auth', authRoutes);
app.use('/api', instructorRoutes);
app.use('/api', courseRoutes);
app.use('/api', lectureRoutes);


mongoose.connect("mongodb+srv://rajgroww216:3k51Ko8ZvCEigQB9@cluster0.atomsws.mongodb.net/lecture_scheduler?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



