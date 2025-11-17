const mysql = require("mysql2");
const fs = require("fs");
const path = require("path");

// Debug logs (keep them for Render)
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_PORT:", process.env.DB_PORT);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_SSL:", process.env.DB_SSL);

// Path to CA certificate
const caPath = path.join(__dirname, "../ca.pem");
console.log("CA Path:", caPath);
console.log("File exists?", fs.existsSync(caPath));

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  // ⭐⭐ ADD THIS EXACT SSL BLOCK ⭐⭐
  ssl: {
    ca: fs.readFileSync(caPath),
    rejectUnauthorized: true
  }
  // ⭐⭐ END SSL BLOCK ⭐⭐
});

// Attempt DB connection
db.connect((err) => {
  if (err) {
    console.error("❌ MySQL connection error:", err);
  } else {
    console.log("✅ Connected to Aiven MySQL!");
  }
});

module.exports = db;
