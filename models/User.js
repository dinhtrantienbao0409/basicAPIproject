const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true, minLength: 3, maxLength: 5 },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
