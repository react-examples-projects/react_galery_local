import firebase from "firebase";

const API_URL = "https://api.imgur.com/3";
const GET_POSTS = API_URL + "/account/znareak/images/";
const CREATE_POSTS = API_URL + "/post";
const DELETE_POST = (id) => `${API_URL}/post/${id}`;
const EDIT_POST = (id) => `${API_URL}/post/${id}`;
const firebaseConfig = {
  apiKey: "AIzaSyDFip5_ERCl4QMWGxVfU3u6GDiF4cbsxNA",
  authDomain: "galeria-fa60c.firebaseapp.com",
  databaseURL: "https://galeria-fa60c-default-rtdb.firebaseio.com",
  projectId: "galeria-fa60c",
  storageBucket: "galeria-fa60c.appspot.com",
  messagingSenderId: "295909850903",
  appId: "1:295909850903:web:b618f3fb2091b22b0d4152",
};
firebase.initializeApp(firebaseConfig);
const TABLE_REF = firebase.database().ref("imagenes");

export {
  API_URL,
  GET_POSTS,
  CREATE_POSTS,
  DELETE_POST,
  EDIT_POST,
  firebaseConfig,
  TABLE_REF,
};
