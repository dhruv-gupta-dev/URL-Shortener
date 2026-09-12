const express = require('express');
const router = express.Router();
const { shortenUrl, getAllUrls } = require('../controllers/urlController');

router.post('/shorten',shortenUrl);

router.get('/urls',getAllUrls);

module.exports = router;
