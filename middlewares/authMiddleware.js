// middlewares/authMiddleware.js
const jwt = require("jsonwebtoken");
const env = require("../.env"); // Import your env.js file

const authenticate = (req, res, next) => {
  // Get the token from the Authorization header
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Verify the token and extract user information
  jwt.verify(token, env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    // Attach user information to the request
    req.user = decoded;
    next();
  });
};

module.exports = { authenticate };
