const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  url: String,
  caption: String,
  ownerUid: String, // Firebase UID du propriétaire
  createdAt: { type: Date, default: Date.now },
  likes: [{ type: String }], // liste d'UIDs qui ont liké
});

module.exports = mongoose.model('Video', videoSchema);
