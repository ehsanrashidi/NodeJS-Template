const secretKey = process.env.SECRET_KEY;
const jwt = require('jsonwebtoken');

// Create and sign a JWT with the provided payload and secret
exports.signToken = (payload) => {
  return jwt.sign(payload, secretKey);
};

// Verify and decode a JWT with the provided token and secret
exports.verifyToken = (token,cb) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    cb(decoded);
  } catch (err) {
    cb(null);
  }
};
exports.VerifyAccess = (req, res, next)=> {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).send({ ErrorMessage: messages.accessDenied });
    }
  
    const token = authHeader.split(' ')[1];
  
    this.verifyToken(token, (decoded) => {
      if (!decoded) {
        return res.status(401).send({ ErrorMessage: messages.accessDenied });
      }
      req.userId = decoded.id;
      next();
    });
  }