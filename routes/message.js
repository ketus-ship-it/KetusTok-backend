const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// Envoyer un message (sauvegarde DB)
router.post('/', async (req, res) => {
  const { from, to, text } = req.body;
  const msg = new Message({ from, to, text });
  await msg.save();
  res.status(201).json(msg);
});

// Récupérer les messages entre deux utilisateurs
router.get('/:uid1/:uid2', async (req, res) => {
  const { uid1, uid2 } = req.params;
  const messages = await Message.find({
    $or: [
      { from: uid1, to: uid2 },
      { from: uid2, to: uid1 }
    ]
  }).sort({ createdAt: 1 });
  res.json(messages);
});

module.exports = router;
