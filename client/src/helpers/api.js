import { GET_POSTS, DELETE_POST, EDIT_POST, TABLE_REF } from "../config/config";
import { toUrlFile } from "./file";

export const xhr = async (url, body = null, method = "GET") => {
  const xhr = await fetch(url, {
    method,
    body,
  });
  const res = await xhr.json();
  return res;
};

export const getImages = (cb) => {
  TABLE_REF.on("value", (snapshot) => {
    const imagesObj = [];
    snapshot.forEach((row) => {
      imagesObj.push(row.val());
    });
    cb(imagesObj);
  });
};

export const createImages = (files) => {
  for (const file of files) {
    const id = `${file.name.trim()}_${Date.now()}`;
    toUrlFile(file, (url) => {
      TABLE_REF.push({
        id,
        url,
        date: new Date().toLocaleString(),
        title: "Unknow title",
      });
      console.log(`[${file.name} - ${file.size} bytes] Agregado a firebase`);
    });
  }
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
