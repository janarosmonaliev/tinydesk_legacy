const mongoose = require("mongoose");
const folder_db = new mongoose.Schema({
  // folder title, array of bookmarks in the folder
  title: String,
  bookmarks: Array,
});

module.exports = mongoose.model("Folder_db", folder_db);
