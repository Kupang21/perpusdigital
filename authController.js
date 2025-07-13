const User = require('../models/User');
const bcrypt = require('bcrypt');

// GET Login Page
exports.getLogin = (req, res) => {
  res.render('auth/login', { message: req.flash('error') });
};

// POST Login
exports.postLogin = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    req.flash('error', 'User tidak ditemukan');
    return res.redirect('/login');
  }

if (password !== user.password) {
  req.flash('error', 'Password salah');
  return res.redirect('/login');
}


  req.session.user = {
    user_id: user.user_id,
    name: user.name,
    role: user.role,
    email: user.email
  };

  if (user.role === 'admin') {
    return res.redirect('/admin/dashboard');
  } else {
    return res.redirect('/member/dashboard');
  }
};

// GET Logout
exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
};
