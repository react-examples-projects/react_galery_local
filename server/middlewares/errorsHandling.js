function clientErrorHandler(err, req, res, next) {
  // catch errors ajax
  if (req.xhr) {
    return res.status(500).json({
      error: err.message,
      status: 500,
    });
  }
  next(err);
}

function errorHandler(err, req, res, next) {
  // catch errors while streaming
  if (req.headersSent) {
    next(err);
  }
  res.status(500).json("error", { error: err, status: 500 });
}

module.exports = {
  clientErrorHandler,
  errorHandler,
};
