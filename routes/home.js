const express = require("express");
const Response = require("../models/response");
const router = express.Router();

router.get("/test", (req, res) => {
    return new Response(res).Success("test page");
});

router.get("/", (req, res) => {
    return new Response(res).Success(process.env.app_name);
});

module.exports = router;
