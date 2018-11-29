const express = require('express');
const router = express.Router();

router.use('/api', require('./account'));
router.use('/api/profile', require('./profile'));

module.exports = router;