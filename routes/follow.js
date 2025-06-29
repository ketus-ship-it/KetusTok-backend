const express = require('express');
const router = express.Router();
const User = require('../models/user'); // majuscule U



// Suivre ou ne plus suivre un utilisateur
router.post('/', async (req, res) => {
  const { followerUid, targetUid } = req.body;

  if (followerUid === targetUid) return res.status(400).json({ error: "Tu ne peux pas te suivre toi-même." });

  const user = await User.findOne({ uid: followerUid });
  if (!user) return res.status(404).json({ error: "Utilisateur introuvable." });

  if (user.following.includes(targetUid)) {
    user.following = user.following.filter(uid => uid !== targetUid); // unfollow
  } else {
    user.following.push(targetUid); // follow
  }

  await user.save();
  res.json({ following: user.following });
});
