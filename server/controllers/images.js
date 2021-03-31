const ImageModel = require("../models/Image");
const { formatFileProps } = require("../helpers/file");

async function saveFilesDatabase(files) {
  const imagesSaved = [];
  for (const url of files) {
    const image = new ImageModel({
      url,
      title: "Unknow title",
      date: new Date().toLocaleString(),
    });
    const saved = await image.save();
    imagesSaved.push(saved);
  }
  return imagesSaved;
}

async function getImagesDatabase() {
  const images = (await ImageModel.find({})).map(formatFileProps);
  return images;
}

async function deleteImageDatabase(id) {
  const data = await ImageModel.deleteOne({ _id: id });
  return data;
}

async function editTitleImage(id, title) {
  const data = await ImageModel.updateOne({ _id: id }, { title });
  return data;
}

module.exports = {
  saveFilesDatabase,
  getImagesDatabase,
  deleteImageDatabase,
  editTitleImage,
};
