const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
  reservation_id: { type: String, required: true, unique: true },
  user_id: { type: String, required: true },
  isbn: { type: String, required: true },
  queued_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Reservation', ReservationSchema);
