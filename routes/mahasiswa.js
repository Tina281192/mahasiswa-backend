const express = require("express");
const db = require("../db");
const router = express.Router();

// READ semua
router.get("/", (req, res) => {
  db.query("SELECT * FROM mahasiswa ORDER BY nim", (err, rows) =>
    err ? res.status(500).json({ error: err.message }) : res.json(rows)
  );
});

// READ satu
router.get("/:nim", (req, res) => {
  db.query("SELECT * FROM mahasiswa WHERE nim = ?", [req.params.nim], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!rows.length) return res.status(404).json({ message: "Data tidak ditemukan" });
    res.json(rows[0]);
  });
});

// CREATE
router.post("/", (req, res) => {
  const { nim, nama, alamat, tgl_lahir, jurusan } = req.body;
  if (!nim || !nama) return res.status(400).json({ message: "NIM dan nama wajib diisi" });
  db.query(
    "INSERT INTO mahasiswa (nim, nama, alamat, tgl_lahir, jurusan) VALUES (?,?,?,?,?)",
    [nim, nama, alamat || null, tgl_lahir || null, jurusan || null],
    (err) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY")
          return res.status(409).json({ message: "NIM sudah terdaftar" });
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ message: "Data berhasil ditambahkan" });
    }
  );
});

// UPDATE
router.put("/:nim", (req, res) => {
  const { nama, alamat, tgl_lahir, jurusan } = req.body;
  db.query(
    "UPDATE mahasiswa SET nama=?, alamat=?, tgl_lahir=?, jurusan=? WHERE nim=?",
    [nama, alamat || null, tgl_lahir || null, jurusan || null, req.params.nim],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!result.affectedRows) return res.status(404).json({ message: "Data tidak ditemukan" });
      res.json({ message: "Data berhasil diperbarui" });
    }
  );
});

// DELETE
router.delete("/:nim", (req, res) => {
  db.query("DELETE FROM mahasiswa WHERE nim = ?", [req.params.nim], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!result.affectedRows) return res.status(404).json({ message: "Data tidak ditemukan" });
    res.json({ message: "Data berhasil dihapus" });
  });
});

module.exports = router;