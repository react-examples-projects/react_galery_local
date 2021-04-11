const { Schema, model } = require("mongoose");

const ImageShema = new Schema({
  url: { type: String, required: true },
  title: { type: String, require: true, trim: true },
  date: { type: String, required: true },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
});

module.exports = model("Image", ImageShema);
