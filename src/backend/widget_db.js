const mongoose = require("mongoose");
const widget_db = new mongoose.Schema({
  // name of the widget
  name: String,
});

module.exports = mongoose.model("Widget_db", widget_db);
