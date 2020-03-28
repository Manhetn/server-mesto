const jwt = require("jsonwebtoken");

const { NODE_ENV, JWT_SECRET } = process.env;
const secretKey = NODE_ENV === "production" ? JWT_SECRET : "secret-key";

const createToken = function(user) {
  return jwt.sign({ _id: user._id }, secretKey, { expiresIn: "7d" });
};

const verifyToken = function(token) {
  return jwt.verify(token, secretKey);
};

module.exports = {
  createToken,
  verifyToken
};
