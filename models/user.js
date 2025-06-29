const mongoose = require('mongoose');
const User = require('./user'); // majuscule U

const userSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true }, // Firebase UID
  displayName: String,
  email: String,
  photoURL: String,
  following: [String], // FOLLOWING ajoutée ici
  following: [String], // liste d’UID suivis
  createdAt: { type: Date, default: Date.now }

});

module.exports = mongoose.model('user', userSchema);

