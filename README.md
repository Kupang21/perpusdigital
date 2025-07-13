# 📚 PerpusDigi – Digital Library System

PerpusDigi adalah aplikasi **Perpustakaan Digital** berbasis Node.js + Express + MongoDB. Sistem ini menyediakan fitur:

- Manajemen pengguna (admin & member)
- Manajemen buku
- Peminjaman dan pengembalian buku
- Review buku
- Reservasi buku

---

## 🚀 Instalasi

1. **Clone repositori**

```
git clone <url-repository-github>
````

2. **Masuk ke folder project**

```
cd perpusdigi
```

3. **Install dependencies**

```
npm install
```

---

## ⚙️ Konfigurasi Koneksi MongoDB

Aplikasi membaca koneksi MongoDB dari file `.env`.

Contoh isi file `.env`:

```
MONGO_URI=mongodb://localhost:27017/perpusdigi
PORT=3000
```

Jika menggunakan MongoDB Atlas (cloud), gunakan:

```
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/perpusdigi?retryWrites=true&w=majority
PORT=3000
```

---

## ▶️ Menjalankan Aplikasi

Jalankan perintah:

```
npm start
```

Jika berhasil, server akan berjalan di:

```
http://localhost:3000
```

---

## 💾 Struktur Folder

```
perpusdigi/
├── app.js
├── package.json
├── .env
├── config/
│   └── db.js
├── controllers/
│   ├── authController.js
│   ├── adminController.js
│   ├── memberController.js
├── models/
│   ├── User.js
│   ├── Book.js
│   ├── Loan.js
│   ├── Review.js
│   └── Reservation.js
├── routes/
│   ├── auth.js
│   ├── admin.js
│   └── member.js
├── middlewares/
│   ├── auth.js
│   └── roleCheck.js
├── public/
│   ├── css/
│   │   └── style.css
│   └── js/
├── views/
│   ├── partials/
│   │   ├── header.ejs
│   │   └── sidebar.ejs
│   ├── auth/
│   │   └── login.ejs
│   ├── admin/
│   │   ├── dashboard.ejs
│   │   ├── books.ejs
│   │   ├── users.ejs
│   │   ├── loans.ejs
│   │   ├── reviews.ejs
│   │   └── reservations.ejs
│   ├── member/
│   │   ├── dashboard.ejs
│   │   ├── books.ejs
│   │   ├── loans.ejs
│   │   ├── reviews.ejs
│   │   └── reservations.ejs
```

---

## 🗄️ Contoh Data di MongoDB

### Koleksi: `books`

```json
{
  "isbn": "9786020329481",
  "title": "Algoritma Pemrograman",
  "author": "Dewi Anjani",
  "publisher": "Gramedia",
  "year": 2022,
  "tags": ["Teknologi", "Pemrograman"],
  "copies_total": 5,
  "copies_available": 2,
  "file": "https://perpusdigital.com/file/algoritma.pdf"
}
```

---

### Koleksi: `users`

```json
{
  "user_id": "U001",
  "name": "Gina Wulandari",
  "email": "gina@gmail.com",
  "password": "gina123",
  "role": "member",
  "joined_at": "2024-07-07T10:00:00Z"
}
```

```json
{
  "user_id": "U002",
  "name": "Admin Perpus",
  "email": "admin@gmail.com",
  "password": "admin123",
  "role": "admin",
  "joined_at": "2024-07-07T10:10:00Z"
}
```

---

### Koleksi: `loans`

```json
{
  "loan_id": "L001",
  "user_id": "U001",
  "isbn": "9786020329481",
  "loan_date": "2024-07-07T10:00:00Z",
  "due_date": "2024-07-14T10:00:00Z",
  "return_date": null,
  "status": "ongoing"
}
```

---

### Koleksi: `reviews`

```json
{
  "review_id": "R001",
  "user_id": "U001",
  "isbn": "9786020329481",
  "rating": 5,
  "comment": "Buku ini sangat bermanfaat untuk pemula.",
  "created_at": "2024-07-07T12:00:00Z"
}
```

---

### Koleksi: `reservations`

```json
{
  "reservation_id": "RS001",
  "user_id": "U002",
  "isbn": "9786020329481",
  "queued_at": "2024-07-07T13:00:00Z"
}
```

---

## 🛠️ Koneksi ke MongoDB

Kode koneksi berada di:

```
config/db.js
```

Contoh implementasi:

```js
const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
```

Dan dipanggil di `app.js`:

```js
const express = require('express');
const app = express();
const connectDB = require('./config/db');
require('dotenv').config();

connectDB();
```
