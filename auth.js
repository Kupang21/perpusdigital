const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Halaman login
router.get('/login', authController.getLogin);

// Proses login
router.post('/login', authController.postLogin);

// Logout
router.get('/logout', authController.logout);

module.exports = router;
