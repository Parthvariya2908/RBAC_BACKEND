const express = require('express');
const { getContentByRole } = require('../controllers/contentController');
const { authenticate } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', authenticate, getContentByRole);

module.exports = router;
