const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  user_id: { type: String, required: true, unique: true },
  name: String,
  email: { type: String, required: true, unique: true },
  password: String,
  role: { type: String, enum: ['admin', 'member'], default: 'member' },
  joined_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
