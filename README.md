# 🛒 Matador Test - CRUD API dengan Node.js, TypeScript, Drizzle ORM & PostgreSQL

Aplikasi ini adalah contoh implementasi CRUD menggunakan:
- Express.js (TypeScript)
- Drizzle ORM
- PostgreSQL (via Supabase)
- Swagger untuk dokumentasi API

---

## 📦 Fitur
- CRUD untuk produk (`/products`)
- CRUD untuk pesanan (`/orders`)
- Swagger UI untuk dokumentasi API

---

## 🔧 Instalasi

### 1. Clone Repositori
```bash
git clone https://github.com/username/matador-test.git
cd matador-test
```

### 2. Install Dependencies
```bash
npm install
```

## 🚀 Menjalankan Aplikasi

### 3. Mode Development
```bash
npm run dev
```

### 4. Mode Production (dengan build)
```bash
npm run build
npm start
```

---

## 📚 Dokumentasi API

Akses Swagger UI di:
```
http://localhost:3000/api-docs
```

---

## ✅ Endpoints

- `GET /products` – Lihat semua produk
- `POST /products` – Tambah produk
- `PUT /products/:id` – Edit produk tertentu berdasarkan 'id'
- `DELETE /products/:id` – Hapus produk tertentu berdasarkan 'id'

- `GET /orders` – Lihat semua pesanan
- `POST /orders` – Buat pesanan baru

---

## 🧩 Tech Stack

- Node.js + TypeScript
- Express.js
- Drizzle ORM
- PostgreSQL (Supabase)
- Swagger UI

---
