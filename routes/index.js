const express = require('express');
const router = express.Router();

router.get('/health-check', async (req, res) => {
    res.send({status: 'Up'});
});

module.exports = router;
