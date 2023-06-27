
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
      answers: [String]
    }
  ]
});

const Chat = mongoose.model("Chat", chatSchema);

const users = [
  { username: "user1", password: "password1", email: "user1@example.com" },
  { username: "user2", password: "password2", email: "user2@example.com" },
];

const chatRows = [
  { chatRow: "Chat row 1", user: "user1", questions: [] },
  { chatRow: "Chat row 2", user: "user2", questions: [] },
];

const questions = [
  { text: "Question 1", answers: [] },
  { text: "Question 2", answers: [] },
];
const insertData = async () => {
  try {
    await User.insertMany(users);
    await Chat.insertMany(chatRows);
    const chatRow1 = await Chat.findOne({ chatRow: "Chat row 1" });
    chatRow1.questions.push(questions[0]);
    await chatRow1.save();
    const chatRow2 = await Chat.findOne({ chatRow: "Chat row 2" });
    chatRow2.questions.push(questions[1]);
    await chatRow2.save();
    console.log("Data inserted successfully");
  } catch (error) {
    console.error("Failed to insert data:", error);
  }
};

module.exports = insertData;
