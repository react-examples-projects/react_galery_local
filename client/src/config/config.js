const API_URL = "http://localhost:5000/api";
const URL_IMAGES = `${API_URL}/posts`;

// Endpoints for images post CRUD
const GET_POSTS = URL_IMAGES + "/";
const GET_POST = (id) => `${URL_IMAGES}/${id}`;
const CREATE_POSTS = URL_IMAGES + "/";
const DELETE_POST = (id) => `${URL_IMAGES}/${id}`;
const EDIT_POST = (id) => `${URL_IMAGES}/${id}`;

export {
  API_URL,
  URL_IMAGES,
  GET_POSTS,
  GET_POST,
  CREATE_POSTS,
  DELETE_POST,
  EDIT_POST,
};
