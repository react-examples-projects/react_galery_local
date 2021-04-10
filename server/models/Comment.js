const { Schema, model } = require("mongoose");

const CommentModel = new Schema({
  id_post: { type: String, required: true },
  username: { type: String, required: true, trim: true },
  content: { type: String, required: true, trim: true },
  date: { type: String, required: true },
  likes: { type: Number, default: 0 },
  dislike: { type: Number, default: 0 },
  replies: { type: Array, default: [] },
});

module.exports = model("Comment", CommentModel);
