const ImageModel = require("../models/Image");
const { saveImageModel } = require("../helpers/models");
const { toArrayFormatFile } = require("../helpers/file");

async function saveFilesDatabase(files) {
  const imagesSaved = [];
  const save = async (url, title, date) => {
    const saved = await saveImageModel({ url, title, date });
    imagesSaved.push(saved);
  };

  if (Array.isArray(files)) {
    for (const url of files) {
      await save(url, "Unknow title", new Date().toLocaleString());
    }
  } else {
    await save(files, "Unknow title", new Date().toLocaleString());
  }
  return toArrayFormatFile(imagesSaved);
}

async function getImagesDatabase() {
  const images = await ImageModel.find({});
  return toArrayFormatFile(images);
}

async function deleteImageDatabase(id) {
  const data = await ImageModel.deleteOne({ _id: id });
  return data;
}

async function editTitleImage(id, title) {
  const data = await ImageModel.updateOne({ _id: id }, { title });
  return data;
}

async function getPostById(id) {
  const data = await ImageModel.findById(id);
  return data.toObject();
}

async function likePost(id) {
  const commentLikes = await getPostById(id);
  const likes = commentLikes.likes + 1;
  const commentUpdated = await ImageModel.updateOne({ _id: id }, { likes });
  return { id, likes };
}

async function dislikePost(id) {
  const commentLikes = await getPostById(id);
  const dislikes = commentLikes.dislikes + 1;
  const commentUpdated = await ImageModel.updateOne({ _id: id }, { dislikes });
  return { id, dislikes };
}

module.exports = {
  saveFilesDatabase,
  getImagesDatabase,
  deleteImageDatabase,
  editTitleImage,
  getPostById,
  likePost,
  dislikePost,
};
