const express = require('express');
const { getCurrentVersion } = require('../controllers/versionController');
const router = express.Router();

router.get('/', getCurrentVersion);

module.exports = router;