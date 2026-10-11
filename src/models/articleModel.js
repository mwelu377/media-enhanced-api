const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    content: {
      type: String,
      required: true
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    // Store URLs of images uploaded to Cloudinary.
    images: {
      type: [String],
      default: []
    }
  },
  {
    timestamps: true
  }
);

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;