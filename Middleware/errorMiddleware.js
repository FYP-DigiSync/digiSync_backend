const fs = require("fs");
const errorMiddleware = (err, req, res, next) => {
  let { status = 500, message = "", data } = err;
  if (status === 500 && message === "") {
    message = "Internal server error";
  }
  const error = {
    type: "error",
    status,
    message,
    ...(data && data),
  };
  
  // type of err is string
  if (typeof err === "string") {
    error.message = err;
  }

  const today = new Date().toISOString();
  const error_message = `[API Error][${today}][#${status}]: ${JSON.stringify(
    error
  )}`;
  var logStream = fs.createWriteStream(`./logs/debug_logs.txt`, {
    flags: "a+",
  });
  logStream.write(error_message);
  logStream.end("\r\n");
  logStream.close();
  res.status(status).json(error);
};
module.exports = errorMiddleware;