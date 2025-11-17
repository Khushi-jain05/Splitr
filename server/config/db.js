const mysql = require("mysql2");
const fs = require("fs");
const path = require("path");

console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_PORT:", process.env.DB_PORT);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_SSL:", process.env.DB_SSL);

const caPath = path.join(__dirname, "../ca.pem");
console.log("CA Path:", caPath);
console.log("File exists?", fs.existsSync(caPath));

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  ssl: {
    minVersion: "TLSv1.2",     // ⭐ REQUIRED BY AIVEN
    ca: fs.readFileSync(caPath),
    rejectUnauthorized: false  // ⭐ REQUIRED FIX
  }
});

db.connect((err) => {
  if (err) {
    console.error("❌ MySQL connection error:", err);
  } else {
    console.log("✅ Connected to Aiven MySQL Successfully!");
  }
});

module.exports = db;
