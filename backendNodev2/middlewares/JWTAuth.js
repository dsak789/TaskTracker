const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwt_secret = process.env.JWT_SECRET;
const jwt_expiry = process.env.JWT_EXPIRES_IN;

exports.genToken = (payload) => {
  return jwt.sign(payload, jwt_secret, { expiresIn: jwt_expiry });
};

exports.validateToken = (token) => {
  return jwt.verify(token, jwt_secret);
};
