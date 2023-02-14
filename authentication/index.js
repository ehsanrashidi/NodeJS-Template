const secretKey = process.env.SECRET_KEY;
const jwt = require('jsonwebtoken');

// Create and sign a JWT with the provided payload and secret
exports.signToken = (payload) => {
  return jwt.sign(payload, secretKey);
};

// Verify and decode a JWT with the provided token and secret
exports.verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (err) {
    return null;
  }
};