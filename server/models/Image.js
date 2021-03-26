const { Schema, model } = require("mongoose");

const ImageShema = new Schema({
  url: { type: String, required: true },
  title: { type: String, require: true },
  filename: { type: String, required: true },
});

module.exports = model("Image", ImageShema);
