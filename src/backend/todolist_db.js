const mongoose = require("mongoose");
const todolist_db = new mongoose.Schema({
  // Email, Location, Password, name, username
  email: String,
  location: String,
  password: String,
  notes: Array,
  todolists: Array,
  folders: Array,
  backgroundImg: Object,
  name: String,
  username: String,
});

module.exports = mongoose.model("Todolist_db", todolist_db);
