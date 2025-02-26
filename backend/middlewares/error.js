const errorHandler = require("../utils/errorHandler");

const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);

  // If headers were already sent, pass the error to the default Express error handler
  if (res.headersSent) {
    return next(err);
  }

  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Validation Error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors)
      .map((value) => value.message)
      .join(", ");
    err = new errorHandler(message, 400);
  }

  // Mongoose CastError (Invalid ID)
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new errorHandler(message, 400);
  }

  // Duplicate Key Error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new errorHandler(message, 400);
  }

  // JWT Errors
  if (err.name === "JsonWebTokenError") {
    err = new errorHandler("Json Web Token is invalid, Try again", 400);
  }

  if (err.name === "TokenExpiredError") {
    err = new errorHandler("Json Web Token is Expired, Try again", 400);
  }

  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

module.exports = errorHandlerMiddleware;

