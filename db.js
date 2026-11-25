require("dotenv").config();
const mysql = require("mysql2");

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "1q2w3e4r5t6y",
  database: process.env.DB_NAME || "db_mahasiswa",
  dateStrings: true, // tgl_lahir dikirim sebagai string YYYY-MM-DD
});

module.exports = pool;