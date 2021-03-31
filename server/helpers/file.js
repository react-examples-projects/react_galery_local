const formatFileProps = ({ title, url, _id, filename }) => ({
  title,
  url,
  id: _id,
  filename,
});

const toArrayFormatFile = (array) => {
  const formated = array.map(formatFileProps);
  return formated;
};

module.exports = {
  formatFileProps,
  toArrayFormatFile,
};
