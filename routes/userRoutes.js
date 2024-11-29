const express = require('express');
const { getProfile, getAllUsers } = require('../controllers/userController');
const { authenticate } = require('../middlewares/authMiddleware');
const { authorizeRole } = require('../middlewares/roleMiddleware');

const router = express.Router();

router.get('/profile', authenticate, getProfile);
router.get('/all', authenticate, authorizeRole(['Admin']), getAllUsers);

module.exports = router;
