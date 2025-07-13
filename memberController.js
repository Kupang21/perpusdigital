const User = require('../models/User');
const Book = require('../models/Book');
const Loan = require('../models/Loan');
const Review = require('../models/Review');
const Reservation = require('../models/Reservation');
const { v4: uuidv4 } = require('uuid');

// Dashboard Member → Lihat buku
exports.dashboard = async (req, res) => {
  const books = await Book.find();
  res.render('member/dashboard', { user: req.session.user, books });
};

exports.loans = async (req, res) => {
  const user_id = req.session.user.user_id;

  const loans = await Loan.find({ user_id });
  const isbns = loans.map(l => l.isbn);
  const books = await Book.find({ isbn: { $in: isbns } });

  // Gabungkan data buku ke masing-masing loan
  const loansWithTitles = loans.map(loan => {
    const book = books.find(b => b.isbn === loan.isbn);
    return {
      ...loan.toObject(),
      title: book ? book.title : 'Judul tidak ditemukan'
    };
  });

  res.render('member/loans', { user: req.session.user, loans: loansWithTitles });
};


exports.reviews = async (req, res) => {
  const user_id = req.session.user.user_id;

  try {
    // Ambil semua review user
    const reviews = await Review.find({ user_id });

    // Ambil semua ISBN dari review
    const isbns = reviews.map(r => r.isbn);

    // Ambil buku berdasarkan ISBN
    const books = await Book.find({ isbn: { $in: isbns } });

    // Buat peta ISBN → Judul
    const bookMap = {};
    books.forEach(book => {
      bookMap[book.isbn] = book.title;
    });

    // Gabungkan data review dan judul buku
    const enrichedReviews = reviews.map(r => ({
      ...r._doc,
      bookTitle: bookMap[r.isbn] || '(Judul tidak ditemukan)'
    }));

    res.render('member/reviews', {
      user: req.session.user,
      reviews: enrichedReviews
    });
  } catch (err) {
    console.error('Gagal mengambil review:', err);
    res.status(500).send('Terjadi kesalahan saat mengambil data review.');
  }
};


// Tambah review
exports.addReview = async (req, res) => {
  const { isbn, rating, comment } = req.body;
  const review = new Review({
    review_id: uuidv4(),
    user_id: req.session.user.user_id,
    isbn,
    rating,
    comment,
    created_at: new Date()
  });
  await review.save();
  res.redirect('/member/reviews');
};

// Reservasi Buku
exports.reservations = async (req, res) => {
  try {
    const userId = req.session.user?.user_id;

    if (!userId) {
      return res.redirect('/login'); // Jika belum login
    }

    const reservations = await Reservation.find({ user_id: userId }).sort({ queued_at: -1 });
    res.render('member/reservations', {
      user: req.session.user,
      reservations
    });
  } catch (error) {
    console.error('Gagal mengambil data reservasi:', error);
    res.status(500).send('Terjadi kesalahan saat mengambil data reservasi.');
  }
};
exports.requestReservation = async (req, res) => {
  const { isbn } = req.body;
  const user_id = req.session.user.user_id;

  try {
    // Cek apakah user sudah mereservasi buku yang sama
    const existing = await Reservation.findOne({ user_id, isbn });
    if (existing) {
      req.flash('error', 'Anda sudah mereservasi buku ini.');
      return res.redirect('/member/reservations');
    }

    const reservation = new Reservation({
      reservation_id: 'RS' + uuidv4().slice(0, 8).toUpperCase(),
      user_id,
      isbn
    });

    await reservation.save();
    res.redirect('/member/reservations');
  } catch (err) {
    console.error('Gagal mereservasi buku:', err);
    res.status(500).send('Terjadi kesalahan saat memproses reservasi.');
  }
};

exports.requestLoan = async (req, res) => {
  const user_id = req.session.user.user_id;
  const { isbn } = req.body;

  try {
    const book = await Book.findOne({ isbn });

    if (!book) {
      return res.status(404).send('Buku tidak ditemukan.');
    }

    if (book.copies_available > 0) {
      // Proses peminjaman
      const loan = new Loan({
        loan_id: 'L' + uuidv4().slice(0, 8).toUpperCase(),
        user_id,
        isbn,
        loan_date: new Date(),
        due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // +7 hari
        status: 'ongoing'
      });

      await loan.save();
      book.copies_available -= 1;
      await book.save();

      return res.redirect('/member/loans');
    } else {
      // Tambahkan ke reservasi
      const reservation = new Reservation({
        reservation_id: 'RS' + uuidv4().slice(0, 8).toUpperCase(),
        user_id,
        isbn
      });

      await reservation.save();
      return res.redirect('/member/reservations');
    }
  } catch (err) {
    console.error('Gagal memproses permintaan peminjaman:', err);
    res.status(500).send('Terjadi kesalahan saat memproses.');
  }
};