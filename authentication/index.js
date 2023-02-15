const secretKey = process.env.SECRET_KEY;
const jwt = require("jsonwebtoken");
const Response = require("../models/response");

// Create and sign a JWT with the provided payload and secret
exports.signToken = (payload) => jwt.sign(payload, secretKey);

// Verify and decode a JWT with the provided token and secret
exports.verifyToken = async (req, cb) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader.split(" ")[1];
        if (!authHeader) cb(null);
        cb(await jwt.verify(token, secretKey));
    } catch (err) {
        console.log("err: ", err);
        cb(null);
    }
};

exports.VerifyAccess = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return new Response(res).AccessDenied();

    this.verifyToken(req, (decoded) => {
        if (!decoded) return new Response(res).AccessDenied();
        req.userId = decoded.userId;
        next();
    });
};
