// utils/errorHandler.js
const errorHandler = (err, req, res, next) => {
  console.error(err); // Log the error for debugging

  // Set default status and message
  let status = err.status || 500;
  let message = err.message || "Internal Server Error";

  // Customize error response for specific cases
  if (err.name === "ValidationError") {
    status = 400; // Bad Request
    message = "Validation Error";
  }

  // Send the error response
  res.status(status).json({ error: message });
};

module.exports = { errorHandler };
