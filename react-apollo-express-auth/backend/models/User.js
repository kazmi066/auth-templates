const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true },
    email: String,
    password: String,
    role: String,
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
