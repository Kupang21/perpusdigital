const User = require('../models/User');
const Book = require('../models/Book');
const Loan = require('../models/Loan');
const Review = require('../models/Review');
const Reservation = require('../models/Reservation');

// GET Dashboard Admin
exports.dashboard = async (req, res) => {
  const totalUsers = await User.countDocuments();
  const totalBooks = await Book.countDocuments();
  const totalLoans = await Loan.countDocuments();

  res.render('admin/dashboard', {
    user: req.session.user,
    stats: { totalUsers, totalBooks, totalLoans }
  });
};

// Manajemen Buku
exports.books = async (req, res) => {
  const books = await Book.find();
  res.render('admin/books', { user: req.session.user, books });
};
// ===== Tambah Buku (GET form) =====
exports.getTambahBuku = (req, res) => {
  res.render('admin/tambahBuku', { user: req.session.user });
};

// ===== Tambah Buku (POST) =====
exports.postTambahBuku = async (req, res) => {
  const { isbn, title, author, publisher, year, tags, copies_total, file } = req.body;

  await Book.create({
    isbn,
    title,
    author,
    publisher,
    year: parseInt(year),
    tags: tags.split(',').map(tag => tag.trim()),
    copies_total: parseInt(copies_total),
    copies_available: parseInt(copies_total),
    file
  });

  res.redirect('/admin/books');
};

// ===== Edit Buku (GET form) =====
exports.getEditBuku = async (req, res) => {
  const book = await Book.findById(req.params.id);
  res.render('admin/editBuku', { user: req.session.user, book });
};

// ===== Edit Buku (PUT) =====
exports.putEditBuku = async (req, res) => {
  const { isbn, title, author, publisher, year, tags, copies_total, file } = req.body;

  await Book.findByIdAndUpdate(req.params.id, {
    isbn,
    title,
    author,
    publisher,
    year: parseInt(year),
    tags: tags.split(',').map(tag => tag.trim()),
    copies_total: parseInt(copies_total),
    file
  });

  res.redirect('/admin/books');
};

// ===== Hapus Buku (DELETE) =====
exports.deleteBuku = async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.redirect('/admin/books');
};


// Manajemen User
exports.users = async (req, res) => {
  const users = await User.find();
  res.render('admin/users', { user: req.session.user, users });
};

// Manajemen Loan
exports.loans = async (req, res) => {
  const loans = await Loan.find();
  res.render('admin/loans', { user: req.session.user, loans });
};
exports.updateLoanStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    await Loan.updateOne({ loan_id: id }, { status });
    res.redirect('/admin/loans');
  } catch (err) {
    console.error('Gagal update status loan:', err);
    res.status(500).send('Terjadi kesalahan saat memperbarui status.');
  }
};
// Manajemen Review
exports.reviews = async (req, res) => {
  const reviews = await Review.find();
  res.render('admin/reviews', { user: req.session.user, reviews });
};

// Manajemen Reservasi
exports.reservations = async (req, res) => {
  const reservations = await Reservation.find();
  res.render('admin/reservations', { user: req.session.user, reservations });
};
