const API_URL = "http://localhost:5000/api";
const URL_IMAGES = `${API_URL}/posts`;
const URL_COMMENTS = `${API_URL}/comments`;

// Endpoints for images post CRUD
const GET_POSTS = URL_IMAGES + "/";
const GET_POST = (id) => `${URL_IMAGES}/${id}`;
const CREATE_POSTS = URL_IMAGES + "/";
const DELETE_POST = (id) => `${URL_IMAGES}/${id}`;
const EDIT_POST = (id) => `${URL_IMAGES}/${id}`;

// Endpoints for comments post CRUD
const GET_COMMENTS = (id) => `${URL_COMMENTS}/${id}`;
const CREATE_COMMENT = URL_COMMENTS + "/";
const DELETE_COMMENT = (id) => `${URL_COMMENTS}/${id}`;
const DELETE_ALL_COMMENTS = (id) => `${URL_COMMENTS}/all/${id}`;
const EDIT_COMMENT = (id) => `${URL_COMMENTS}/${id}`;
const LIKE_COMMENT = (id) => `${URL_COMMENTS}/like/${id}`;

export {
  API_URL,
  // end points images
  URL_IMAGES,
  GET_POSTS,
  GET_POST,
  CREATE_POSTS,
  DELETE_POST,
  EDIT_POST,
  // end points comments
  URL_COMMENTS,
  GET_COMMENTS,
  CREATE_COMMENT,
  DELETE_COMMENT,
  DELETE_ALL_COMMENTS,
  EDIT_COMMENT,
  LIKE_COMMENT,
};
