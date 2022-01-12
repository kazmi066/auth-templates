const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    user: String,
    title: String,
    description: String,
    isDone: Boolean,
    owner_id: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
