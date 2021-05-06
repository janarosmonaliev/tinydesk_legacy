const mongoose = require("mongoose");
const todolist_db = new mongoose.Schema({
  // todolist title, array of Todos in the list
  title: String,
  todos: Array,
});

module.exports = mongoose.model("Todolist_db", todolist_db);
