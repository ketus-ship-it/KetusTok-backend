const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  from: String, // UID de l’expéditeur
  to: String,   // UID du destinataire
  text: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Message', messageSchema);
