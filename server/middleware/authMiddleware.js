const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;


// ✅ Middleware to verify token
function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Extract token after "Bearer"

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified; // store user info in request
    next(); // continue to the next route
  } catch (err) {
    res.status(400).json({ message: "Invalid token." });
  }
}

module.exports = verifyToken;

