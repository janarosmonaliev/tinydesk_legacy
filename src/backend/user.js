const mongoose = require("mongoose");
const user = new mongoose.Schema({
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

module.exports = mongoose.model("User", user);
