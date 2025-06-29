const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

// Ajouter un commentaire
router.post('/', async (req, res) => {
  const { videoId, userUid, text } = req.body;
  try {
    const comment = new Comment({ videoId, userUid, text });
    await comment.save();
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtenir les commentaires d'une vidéo
router.get('/:videoId', async (req, res) => {
  try {
    const comments = await Comment.find({ videoId: req.params.videoId }).sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
