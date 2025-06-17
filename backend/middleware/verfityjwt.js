const { verify } = require("crypto");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyJwt = async (req, res, next) => {
  console.log(req.headers.cookies);
  const token = req.cookies.my_token;
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  try {
    const my_data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = my_data; // Attach user data to the request object
    next(); // Call the next middleware or route handler
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = {
  verifyJwt,
};
