const express = require('express');

const requireAuth = require('../middleware/requireAuth');
const upload = require('../middleware/uploadMiddleware');

const {
  getArticles,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle
} = require('../controllers/articleController');

const router = express.Router();

// GET all articles
router.get('/', requireAuth, getArticles);

// GET one article
router.get('/:id', requireAuth, getArticle);

// CREATE an article with up to 5 images
router.post(
  '/',
  requireAuth,
  upload.array('images', 5),
  createArticle
);

// UPDATE an article
router.put('/:id', requireAuth, updateArticle);

// DELETE an article
router.delete('/:id', requireAuth, deleteArticle);

module.exports = router;