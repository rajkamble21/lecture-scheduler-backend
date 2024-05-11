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
const PORT = 4000;


app.use(cors({
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
}));

app.use(express.json());

app.get("/protected", verifyToken, (req, res) => {
  res.status(200).send("Welcome to the protected route");
});

app.use('/auth', authRoutes);
app.use('/api', instructorRoutes);
app.use('/api', courseRoutes);
app.use('/api', lectureRoutes);



mongoose.connect("mongodb://localhost:27017/lecture_scheduler", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



