const mysql = require("mysql2");
const fs = require("fs");
const path = require("path");

const ca = fs.readFileSync(path.join(__dirname, "../ca.pem"));

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    ca: ca
  }
});

db.connect((err) => {
  if (err) {
    console.error("❌ MySQL connection error:", err);
    return;
  }
  console.log("✅ Connected to Aiven MySQL Successfully");
});

module.exports = db;
