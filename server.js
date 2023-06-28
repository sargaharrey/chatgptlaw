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



const ChatRowSchema = new mongoose.Schema({
  question: String,
  answer: String
});

const ChatParentSchema = new mongoose.Schema({
  userId: String,
  chatRows: [ChatRowSchema]
});

const ChatParent = mongoose.model('ChatParent', ChatParentSchema);



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
  const { userId, chatParent } = req.query;
  try {
  
    const chats = await ChatParent.find({ user: userId, chatParent: chatParent });
    res.status(200).json(req.query);
  } catch (error) {
    console.error("Failed to fetch chat rows:", error);
    res.status(500).json({ error: "Failed to fetch chat rows" });
  }
});

// Route to add a new chat parent
app.post('/addChatParent', async (req, res) => {
  const chatParent = new ChatParent({
    userId: req.body.userId,
    chatRows: []
  });

  try {
    await chatParent.save();
 res.json({ message: 'Chat parent added successfully', chatParentId: chatParent._id });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});
// app.post('/getChatParent', async (req, res) => {
//   const chatParentsId = await ChatParent.find({ userId: req.query.userId });

// })
// Route to add a new chat row to a chat parent

app.post('/addChatRow', async (req, res) => {
  try {
    const chatParent = await ChatParent.findOne({ _id: req.body.chatParent });
    if (!chatParent) {

      return res.status(404).json({ error: 'Chat parent not found' });
    }
    chatParent.chatRows.push({ question: req.body.question, answer: req.body.answer });
    await chatParent.save();
    res.json({ message: 'Chat row added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});
// Route to get all chat parents for a user
app.get('/chatParents', async (req, res) => {
  try {
    const chatParents = await ChatParent.find({ userId: req.query.userId });
    res.json(chatParents);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});


app.listen(5001, () => {
  console.log("Server is running on port 5001");
});
