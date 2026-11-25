const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "1q2w3e4r5t6y",
  database: "db_mahasiswa",
});

// READ semua
app.get("/api/mahasiswa", (req, res) => {
  db.query("SELECT * FROM mahasiswa", (err, rows) =>
    err ? res.status(500).json({ error: err.message }) : res.json(rows)
  );
});

// READ satu
app.get("/api/mahasiswa/:nim", (req, res) => {
  db.query("SELECT * FROM mahasiswa WHERE nim = ?", [req.params.nim], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!rows.length) return res.status(404).json({ message: "Tidak ditemukan" });
    res.json(rows[0]);
  });
});

// CREATE
app.post("/api/mahasiswa", (req, res) => {
  const { nim, nama, alamat, tgl_lahir, jurusan } = req.body;
  db.query(
    "INSERT INTO mahasiswa (nim, nama, alamat, tgl_lahir, jurusan) VALUES (?,?,?,?,?)",
    [nim, nama, alamat, tgl_lahir || null, jurusan],
    (err) =>
      err
        ? res.status(500).json({ error: err.message })
        : res.status(201).json({ message: "Data ditambahkan" })
  );
});

// UPDATE
app.put("/api/mahasiswa/:nim", (req, res) => {
  const { nama, alamat, tgl_lahir, jurusan } = req.body;
  db.query(
    "UPDATE mahasiswa SET nama=?, alamat=?, tgl_lahir=?, jurusan=? WHERE nim=?",
    [nama, alamat, tgl_lahir || null, jurusan, req.params.nim],
    (err) =>
      err
        ? res.status(500).json({ error: err.message })
        : res.json({ message: "Data diperbarui" })
  );
});

// DELETE
app.delete("/api/mahasiswa/:nim", (req, res) => {
  db.query("DELETE FROM mahasiswa WHERE nim = ?", [req.params.nim], (err) =>
    err
      ? res.status(500).json({ error: err.message })
      : res.json({ message: "Data dihapus" })
  );
});

app.listen(5000, () => console.log("Server jalan di http://localhost:5000"));

