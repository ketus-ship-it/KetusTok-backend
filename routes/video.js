const express = require('express');
const Video = require('../models/Video');
const router = express.Router();

// Récupérer toutes les vidéos
router.get('/', async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 });
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ajouter une nouvelle vidéo
router.post('/', async (req, res) => {
  const { url, caption, ownerUid } = req.body;
  const newVideo = new Video({ url, caption, ownerUid });
  try {
    const savedVideo = await newVideo.save();
    res.status(201).json(savedVideo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;

// Ajouter ou retirer un like
router.post('/:videoId/like', async (req, res) => {
  const { uid } = req.body;
  try {
    const video = await Video.findById(req.params.videoId);
    const hasLiked = video.likes.includes(uid);

    if (hasLiked) {
      video.likes = video.likes.filter(id => id !== uid); // retirer like
    } else {
      video.likes.push(uid); // ajouter like
    }

    await video.save();
    res.json(video);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});