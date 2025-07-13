const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  review_id: { type: String, required: true, unique: true },
  user_id: { type: String, required: true },
  isbn: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5 },
  comment: String,
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', ReviewSchema);
