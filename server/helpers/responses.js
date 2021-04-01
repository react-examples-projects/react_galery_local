function error(error, status = 500) {
  return {
    ok: false,
    error,
    data: null,
    status,
  };
}

function success(data, status = 200) {
  return {
    ok: true,
    data,
    error: null,
    status,
  };
}

module.exports = { error, success };
