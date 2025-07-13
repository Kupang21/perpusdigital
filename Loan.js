const mongoose = require('mongoose');

const LoanSchema = new mongoose.Schema({
  loan_id: { type: String, required: true, unique: true },
  user_id: { type: String, required: true },
  isbn: { type: String, required: true },
  loan_date: { type: Date, default: Date.now },
  due_date: { type: Date, required: true },
  return_date: { type: Date, default: null },
  status: { type: String, enum: ['ongoing', 'returned'], default: 'ongoing' }
});

module.exports = mongoose.model('Loan', LoanSchema);
