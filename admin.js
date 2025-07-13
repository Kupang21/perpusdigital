const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { isAdmin } = require('../middlewares/roleCheck');
const methodOverride = require('method-override');

router.use(methodOverride('_method'));

// ===== Dashboard =====
router.get('/dashboard', isAdmin, adminController.dashboard);

// ===== Manajemen Buku =====
router.get('/books', isAdmin, adminController.books);
router.get('/books/tambah', isAdmin, adminController.getTambahBuku);
router.post('/books/tambah', isAdmin, adminController.postTambahBuku);
router.get('/books/edit/:id', isAdmin, adminController.getEditBuku);
router.put('/books/edit/:id', isAdmin, adminController.putEditBuku);
router.delete('/books/delete/:id', isAdmin, adminController.deleteBuku);

// ===== Manajemen Pengguna =====
router.get('/users', isAdmin, adminController.users);

// ===== Manajemen Peminjaman =====
router.get('/loans', isAdmin, adminController.loans);
router.post('/loans/update-status/:id', isAdmin, adminController.updateLoanStatus);

// ===== Manajemen Review =====
router.get('/reviews', isAdmin, adminController.reviews);

// ===== Manajemen Reservasi =====
router.get('/reservations', isAdmin, adminController.reservations);

module.exports = router;
