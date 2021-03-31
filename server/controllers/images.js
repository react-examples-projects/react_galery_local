const ImageModel = require("../models/Image");
const { formatFileProps } = require("../helpers/file");
const path = require("path");

async function saveFileDatabase(file) {
  const ext = path.extname(file.name).replace(".", "");
  let url = `data:image/${ext};base64`;
  url += Buffer.from(file.data).toString("base64");
  const image = new ImageModel({
    url,
    title: "Unknow title",
    filename: file.name,
  });
  const saved = await image.save();
  return saved;
}

async function createFiles(files) {
  const data = [];
  for (const file of files) {
    const fileSaved = await saveFileDatabase(file);
    data.push(formatFileProps(fileSaved));
  }
  return data;
}

async function createOneFile(file) {
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
