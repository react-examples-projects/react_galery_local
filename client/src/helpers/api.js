import { GET_POSTS, CREATE_POSTS } from "../config/config";

export const xhr = async (url, body = null, method = "GET") => {
  const xhr = await fetch(url, { method, body });
  const res = await xhr.json();
  return res;
};

export const getImages = async () => {
  const res = await xhr(GET_POSTS);
  return res;
};

export const createImages = async (form) => {
  const res = await xhr(CREATE_POSTS, new FormData(form), "POST");
  return res;
};
