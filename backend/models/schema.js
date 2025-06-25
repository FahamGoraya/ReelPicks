const mongoose = require("../db/mongo.js");
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  moviesClicked: {
    type: [String],
    default: [],
  },
});
exports.User = mongoose.model("User", userSchema);
