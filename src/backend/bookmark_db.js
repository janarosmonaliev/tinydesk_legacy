const mongoose = require("mongoose");
const bookmark_db = new mongoose.Schema({
  // bookmark title, url, color tag, and thumbnail
  title: String,
  url: String,
  color: String,
  thumbnail: String,
});

module.exports = mongoose.model("Bookmark_db", bookmark_db);
