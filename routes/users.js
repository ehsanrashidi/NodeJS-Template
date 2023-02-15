const express = require("express");
const router = express.Router();
const { users, cryptography } = require("../services");
const { VerifyAccess } = require("../authentication");
const Response = require("../models/response");

router.get("/:userid", VerifyAccess, async (req, res) => {
    var user = users.getbyid(req.params.userid);
    res.send({ user });
});

router.post("/", (req, res) => {
    users
        .save(req.body)
        .then((user) => new Response(res).Success({ user }))
        .catch((err) => new Response(res).Failed(err));
});

router.post('/login',(req,res)=>{
    users
    .login(req.body)
    .then((result)=> new Response(res).Success(result))
    .catch((err)=>new Response(res).Failed(err))
})

router.get("/check-user-name/:username", (req, res) => {
    users
        .checkUserName(req.params.username)
        .then((exists) => new Response(res).Success({ exists: exists }))
        .catch((err) => new Response(res).Failed(err));
});

module.exports = router;
