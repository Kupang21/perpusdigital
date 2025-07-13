const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  isbn: { type: String, required: true, unique: true },
  title: String,
  author: String,
  publisher: String,
  year: Number,
  tags: [String],
  copies_total: Number,
  copies_available: Number,
  file: String
});

module.exports = mongoose.model('Book', BookSchema);
