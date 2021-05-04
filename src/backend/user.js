const mongoose = require('mongoose');
const user = new mongoose.Schema({
    // Email, Location, Password, name, username
    name: String,
    username: String,
    email: String,
    password: String,
    location: String
});

module.exports = mongoose.model("User", user);