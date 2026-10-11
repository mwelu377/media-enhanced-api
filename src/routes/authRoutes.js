const express = require('express');

const {
  signup,
  login,
  uploadAvatar
} = require('../controllers/authController');

const requireAuth = require('../middleware/requireAuth');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

// SIGN UP
router.post('/signup', signup);

// LOGIN
router.post('/login', login);

// UPLOAD PROFILE AVATAR
router.post(
  '/avatar',
  requireAuth,
  upload.single('avatar'),
  uploadAvatar
);

module.exports = router;