const { PORT } = require("../config/config");
const path = require("path");
const getName = (f) => f.name;
const toData = (f) => f.data;
const createUrl = (file) => `http://127.0.0.1:${PORT}/${getName(file)}`;

const toUrl = (files, _path = "") => {
  if (!(files instanceof Array)) files = [files];
  const arr = files.map(createUrl);
  return arr;
};

const formatFileProps = ({ title, url, _id, filename }) => ({
  title,
  url,
  id: _id,
  filename,
});

module.exports = {
  getName,
  toData,
  toUrl,
  formatFileProps,
};
