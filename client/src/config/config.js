const API_URL = "http://localhost:5000";
const GET_POSTS = API_URL + "/posts";
const CREATE_POSTS = API_URL + "/post";
const DELETE_POST = (id) => `${API_URL}/post/${id}`;

export { API_URL, GET_POSTS, CREATE_POSTS, DELETE_POST };
