const mongoose = require("mongoose");
const todo_db = new mongoose.Schema({
  // Todo title, isComplete
  title: String,
  isComplete: Boolean,
});

module.exports = mongoose.model("Todo_db", todo_db);
