const ImageModel = require("../models/Image");
const { PORT } = require("../config/config");
const { createFile, formatFileProps } = require("../helpers/file");

async function saveFileDatabase(file) {
  const image = new ImageModel({
    url: `http://127.0.0.1:${PORT}/${file.name}`,
    title: "Unknow title",
    filename: file.name,
  });
  const saved = await image.save();
  return saved;
}

async function createFiles(files) {
  const data = [];
  for (const file of files) {
    createFile("./uploads", file);
    const fileSaved = await saveFileDatabase(file);
    data.push(formatFileProps(fileSaved));
  }
  return data;
}

async function createOneFile(file) {
  createFile("./uploads", file);
  const fileSaved = await saveFileDatabase(file);
  return formatFileProps(fileSaved);
}

async function saveFilesDatabase(files) {
  let saved;
  if (files instanceof Array) {
    saved = await createFiles(files);
    return saved;
  }
  saved = await createOneFile(files);
  return saved;
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
  saveFileDatabase,
  createFiles,
  createOneFile,
  saveFilesDatabase,
  getImagesDatabase,
  deleteImageDatabase,
  editTitleImage,
};
