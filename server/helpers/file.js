const { PORT } = require("../config/config");
const path = require("path");
const fs = require("fs");
const getName = (f) => f.name;
const toData = (f) => f.data;
const createPath = (_path, file) => path.resolve(_path, getName(file));
const createUrl = (file) => `http://127.0.0.1:${PORT}/${getName(file)}`;

const toUrl = (files, _path = "") => {
  if (!(files instanceof Array)) files = [files];
  const arr = files.map(createUrl);
  return arr;
};

const createFile = (_path, file) => {
  fs.writeFileSync(createPath(_path, file), toData(file));
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
  createFile,
  formatFileProps,
};
