const { fail } = require("assert");

exports.abort = (res, status_code, message = "internal server error") => {
  res.status(status_code).json({
    status: "fail",
    code: status_code,
    message: message,
  });
};
