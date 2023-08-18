const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  // Get the token from either the Authorization header or the cookie
  const token = req.headers.authorization
    ? req.headers.authorization.split(" ")[1]
    : req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Verify the token and extract user information
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).json({ error: "Unauthorized" });
    }
    // Attach user information to the request
    req.user = decoded;
    next(); // Move to the next middleware
  });
};

module.exports = { authenticate };

const isAdmin = (req, res, next) => {
  // Check if the authenticated user is an admin
  if (req.user && req.user.isAdmin) {
    console.log("User is an admin."); // Log that the user is an admin
    next(); // Continue to the next middleware/route handler
  } else {
    console.log("User is not an admin."); // Log that the user is not an admin
    res.status(403).json({ error: "Access forbidden" });
  }
};

module.exports = { authenticate, isAdmin };
