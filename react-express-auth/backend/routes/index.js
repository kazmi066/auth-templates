const express = require('express');
const { verifyToken } = require('../middlewares/verifyToken');
const router = express.Router();

router.use('/auth', require('./auth.route'));

router.get('/test', verifyToken, (req, res) => {
    res.send(req.cookies);
})

module.exports = router;