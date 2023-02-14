const express = require('express');
const router = express.Router();
const {users} = require('../services');

router.get('/:userId', async (req, res) => {
    var user = users.getById(req.params.userId)
    res.send({user})
});

module.exports = router;