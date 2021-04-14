import {
  // images endpoints
  CREATE_POSTS,
  GET_POSTS,
  GET_POST,
  DELETE_POST,
  EDIT_POST,
  LIKE_POST,
  DISLIKE_POST,
  // comments endpoints
  GET_COMMENTS,
  CREATE_COMMENT,
  DELETE_COMMENT,
  DELETE_ALL_COMMENTS,
  EDIT_COMMENT,
  LIKE_COMMENT,
  DISLIKE_COMMENT,
} from "../config/config";
import { toArrayUrlFiles } from "./file";

export const xhr = async (url, body = null, method = "GET") => {
  const xhr = await fetch(url, {
    method,
    body,
  });
  const res = await xhr.json();
  return res;
};

// posts images

export const getImages = async () => {
  const data = await xhr(GET_POSTS);
  return data;
};

export const getPost = async (id) => {
  const data = await xhr(GET_POST(id));
  return data;
};

export const createImages = async (files) => {
  const data = new FormData();
  const urlFiles = await toArrayUrlFiles(files);
  for (const fileUrl of urlFiles) data.append("files[]", fileUrl);
  const res = await xhr(CREATE_POSTS, data, "POST");
  return res;
};

export const deleteImage = async (id, filename) => {
  const data = new FormData();
  data.append("filename", filename);
  const res = await xhr(DELETE_POST(id), data, "DELETE");
  return res;
};

export const editTitleImage = async ({ id, filename, title }) => {
  const data = new FormData();
  data.append("filename", filename);
  data.append("title", title);
  const res = await xhr(EDIT_POST(id), data, "PUT");
  return res;
};

export const likeImage = async (id) => {
  const data = await xhr(LIKE_POST(id), null, "POST");
  return data;
};

export const dislikeImage = async (id) => {
  const data = await xhr(DISLIKE_POST(id), null, "POST");
  return data;
};

// comments

export const getCommentsByPost = async (id) => {
  const data = await xhr(GET_COMMENTS(id));
  return data;
};

export const createComment = async (payload) => {
  const data = await xhr(CREATE_COMMENT, payload, "POST");
  return data;
};

export const deleteAllCommentsInPost = async (id_post) => {
  const data = await xhr(DELETE_ALL_COMMENTS(id_post), null, "DELETE");
  return data;
};

export const likeComment = async (id) => {
  const data = await xhr(LIKE_COMMENT(id), null, "POST");
  return data;
};

export const dislikeComment = async (id) => {
  const data = await xhr(DISLIKE_COMMENT(id), null, "POST");
  return data;
};
