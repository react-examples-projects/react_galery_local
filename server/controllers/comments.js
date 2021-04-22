const CommentModel = require("../models/Comment");
const ImageModel = require("../models/Image");
const { removeOneComment } = require("./images");

async function getComments(id_post) {
  const comments = await CommentModel.find({ id_post });
  return comments;
}

async function getComment(id) {
  const comment = await CommentModel.findById(id);
  return comment.toObject();
}

async function deleteComment(id, id_post) {
  await removeOneComment(id_post);
  const data = await CommentModel.deleteOne({ _id: id });
  return data;
}

async function deleteAllCommentsInPost(id_post) {
  const data = await CommentModel.deleteMany({ id_post });
  return data;
}

async function editComment(id, payload) {
  const data = await CommentModel.updateOne({ _id: id }, payload);
  return data;
}

async function createComment(payload) {
  async function addCommentCount(id) {
    const imagePost = await ImageModel.findById(id);
    await ImageModel.findByIdAndUpdate(id, {
      comments: imagePost.comments + 1,
    });
  }

  const comment = new CommentModel(payload);
  await addCommentCount(payload.id_post);
  const data = await comment.save();
  return data;
}

async function likeComment(id) {
  const commentLikes = await getComment(id);
  const likes = commentLikes.likes + 1;
  const commentUpdated = await CommentModel.updateOne({ _id: id }, { likes });
  return { id, likes };
}

async function dislikeComment(id) {
  const commentLikes = await getComment(id);
  const dislikes = commentLikes.dislikes + 1;
  const commentUpdated = await CommentModel.updateOne(
    { _id: id },
    { dislikes }
  );
  return { id, dislikes };
}

module.exports = {
  getComments,
  deleteComment,
  editComment,
  createComment,
  deleteAllCommentsInPost,
  likeComment,
  dislikeComment,
};
