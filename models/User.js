const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcript = require("bcrypt");

const userSchema = new Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
});

userSchema.methods.checkPassword = function (password, cb) {
  bcript.compare(password, this.password, function (err, result) {
    return cb(err, result);
  });
};

const User = mongoose.model("User", userSchema);

module.exports = User;
