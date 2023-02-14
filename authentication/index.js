const secretKey = process.env.SECRET_KEY;
const jwt = require("jsonwebtoken");
const Response = require("../models/response");

// Create and sign a JWT with the provided payload and secret
exports.signToken = (payload) => jwt.sign(payload, secretKey);

// Verify and decode a JWT with the provided token and secret
exports.verifyToken = (token, cb) => {
    try {
        const decoded = jwt.verify(token, secretKey);
        cb(decoded);
    } catch (err) {
        cb(null);
    }
};

exports.VerifyAccess = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return new Response(res).AccessDenied();

    const token = authHeader.split(" ")[1];

    this.verifyToken(token, (decoded) => {
        if (!decoded) return new Response(res).AccessDenied();
        req.userId = decoded.id;
        next();
    });
};
