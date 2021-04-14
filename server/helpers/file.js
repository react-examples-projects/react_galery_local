const formatFileProps = ({ title, url, _id, filename, likes, dislikes }) => ({
  title,
  url,
  id: _id,
  filename,
  likes,
  dislikes,
});

const toArrayFormatFile = (array) => {
  const formated = array.map(formatFileProps);
  return formated;
};

module.exports = {
  formatFileProps,
  toArrayFormatFile,
};
