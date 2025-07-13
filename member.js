const express = require('express');
const router = express.Router();
const memberController = require('../controllers/memberController');
const { isMember } = require('../middlewares/roleCheck');

// Dashboard member (lihat buku)
router.get('/dashboard', isMember, memberController.dashboard);

// Riwayat pinjam
router.get('/loans', isMember, memberController.loans);
router.post('/loans/request', isMember, memberController.requestLoan);

// Riwayat review dan input review
router.get('/reviews', isMember, memberController.reviews);
// Review routes
router.post('/reviews', isMember, memberController.addReview); // ✅ Ini

// Riwayat reservasi
router.get('/reservations', isMember, memberController.reservations);
router.post('/reservations/request', isMember, memberController.requestReservation);

module.exports = router;
