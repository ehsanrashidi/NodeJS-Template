const express = require("express");
const router = express.Router();
const { users } = require("../services");
const { VerifyAccess, verifyToken } = require("../authentication");
const Response = require("../models/response");
const UserDTO = require("../dto/UserDTO");

router.get("/profile/:userid", VerifyAccess, async (req, res) => {
    var user = users.getById(req.params.userid);
    res.send({ user });
});

router.post("/", (req, res) => {
    users
        .save(req.body)
        .then((user) => new Response(res).Success({ user: new UserDTO(user) }))
        .catch((err) => new Response(res).Failed(err));
});

router.post("/login", (req, res) => {
    users
        .login(req.body)
        .then((result) => {
            console.log("result: ", result);
            new Response(res).Success(result);
        })
        .catch((err) => {
            console.log("error: ", err);
            new Response(res).Failed(err);
        });
});

router.get("/check-user-name/:username", (req, res) => {
    users
        .checkUserName(req.params.username)
        .then((exists) => new Response(res).Success({ exists: exists }))
        .catch((err) => new Response(res).Failed(err));
});

router.get("/check-user-info", VerifyAccess, (req, res) => {
    users
        .getById(req.userId)
        .then((user) => {
            new Response(res).Success({ exists: true, result: new UserDTO(user) });
        })
        .catch((err) => {
            new Response(res).Failed(err);
        });
});

router.post("/change-password", VerifyAccess, (req, res) => {
    users
        .changePassword(req.userId, req.body.oldPassword, req.body.newPassword)
        .then((result) => {
            new Response(res).Success({ result: result });
        })
        .catch((err) => {
            new Response(res).Failed(err);
        });
});

module.exports = router;
