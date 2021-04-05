const { Schema, model } = require("mongoose");

const CommentModel = new Schema({
  username: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: String, required: true },
});

module.exports = model("Comment", CommentModel);
