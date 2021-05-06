const mongoose = require("mongoose");
const notes_db = new mongoose.Schema({
  // Note title and content
  title: String,
  content: String,
});

module.exports = mongoose.model("Notes_db", notes_db);
