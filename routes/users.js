const express = require('express');
const router = express.Router();
const {users} = require('../services');
const {VerifyAccess} = require('../authentication');

router.get('/:userid',VerifyAccess, async (req, res) => {
    var user = users.getbyid(req.params.userid)
    res.send({user})
});


module.exports = router;