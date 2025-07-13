const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const memberRoutes = require('./routes/member');

require('dotenv').config();

// DB config
require('./config/db');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');

// Session
app.use(session({
  secret: 'perpusdigi_secret',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI })
}));
app.use(flash());

// Routes
app.use('/', require('./routes/auth'));
app.use('/admin', require('./routes/admin'));
// app.use('/member', require('./routes/member'));
app.use('/member', memberRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
