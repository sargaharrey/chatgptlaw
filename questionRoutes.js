// Assuming you have already set up Express.js and Mongoose

// Import necessary modules
const express = require("express");
const router = express.Router();
const Question = require("./Question");

// Route to handle storing the question in MongoDB
router.post("/questions", async (req, res) => {
  try {
    const { question } = req.body;
    const newQuestion = new Question({ question });
    await newQuestion.save();
    res.status(201).json({ message: "Question stored successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error storing question" });
  }
});

module.exports = router;
