const API_URL = "http://localhost:5000";
const GET_POSTS = API_URL + "/posts";
const GET_POST = (id) => `${API_URL}/post/${id}`;
const CREATE_POSTS = API_URL + "/post";
const DELETE_POST = (id) => `${API_URL}/post/${id}`;
const EDIT_POST = (id) => `${API_URL}/post/${id}`;

export { API_URL, GET_POSTS,GET_POST, CREATE_POSTS, DELETE_POST, EDIT_POST };
