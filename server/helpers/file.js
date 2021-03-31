const formatFileProps = ({ title, url, _id, filename }) => ({
  title,
  url,
  id: _id,
  filename,
});

module.exports = {
  formatFileProps,
};
