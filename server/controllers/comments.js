const CommentModel = require("../models/Comment");

async function getComments(id_post) {
  const comments = await CommentModel.find({ id_post });
  return comments;
}

async function deleteComment(id) {
  const data = await CommentModel.deleteOne({ _id: id });
  return data;
}

async function editComment(id, payload) {
  const data = await CommentModel.updateOne({ _id: id }, payload);
  return data;
}

async function createComment(payload) {
  const comment = new CommentModel(payload);
  const data = await comment.save();
  return data;
}

module.exports = {
  getComments,
  deleteComment,
  editComment,
  createComment,
};
