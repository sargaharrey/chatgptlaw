const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect("mongodb://localhost/form-db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const formDataSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
});

const User = mongoose.model("User", formDataSchema);

const chatSchema = new mongoose.Schema({
  chatRow: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  questions: [
    {
      text: {
        type: String,
        required: true
      },
      answers: String
    }
  ]
});

const Chat = mongoose.model("Chat", chatSchema);

app.post("/register", async (req, res) => {
  const { username, password, email } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).send("Username already exists");
  }
  await User.create({ username, password, email });
  res.status(200).json({ username });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) {
    return res.status(400).send("Invalid username or password");
  }
  res.status(200).json({ username: user.username, userId: user._id });
});

app.get("/chatRows", async (req, res) => {
  try {
    const chatRows = await Chat.find({ user: req.userId }).populate("user");
    res.status(200).json(chatRows);
  } catch (error) {
    console.error("Failed to fetch chat rows:", error);
    res.status(500).json({ error: "Failed to fetch chat rows" });
  }
});


app.post("/addChatRow", async (req, res) => {
  const { chatRow,userId,question } = req.body;
console.log(req.body)
  try {
   const newChatRow = new Chat({
      chatRow,
      user: userId,
      question:question,
    });

    await newChatRow.save();

    res.status(201).json({ message: "Chat row added successfully" });
  } catch (error) {
    console.error("Failed to add chat row:", error);
    res.status(500).json({ error: "Failed to add chat row" });
  }
});

app.post("/addQuestion/:chatRowId", async (req, res) => {
  const { question } = req.body;
  const { chatRowId } = req.params;

  try {
    const chatRow = await Chat.findById(chatRowId);
    if (!chatRow) {
      return res.status(404).send("Chat row not found");
    }

    const newQuestion = {
      text: question,
      answers: [],
    };

    chatRow.questions.push(newQuestion);
    await chatRow.save();

    res.status(200).json({ message: "Question added successfully" });
  } catch (error) {
    console.error("Failed to add question:", error);
    res.status(500).json({ error: "Failed to add question" });
  }
});

app.post("/addAnswer/:chatRowId/:questionIndex", async (req, res) => {
  const { answer } = req.body;
  const { chatRowId, questionIndex } = req.params;

  try {
    const chatRow = await Chat.findById(chatRowId);
    if (!chatRow) {
      return res.status(404).send("Chat row not found");
    }

    const question = chatRow.questions[questionIndex];
    if (!question) {
      return res.status(404).send("Question not found");
    }

    question.answers.push(answer);
    await chatRow.save();

    res.status(200).json({ message: "Answer added successfully" });
  } catch (error) {
    console.error("Failed to add answer:", error);
    res.status(500).json({ error: "Failed to add answer" });
  }
});

app.listen(5001, () => {
  console.log("Server is running on port 5001");
});
