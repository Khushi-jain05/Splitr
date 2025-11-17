const mysql = require("mysql2");
const fs = require("fs");
const path = require("path");

// ✅ ADD THESE LINES HERE
const caPath = path.join(__dirname, "../ca.pem");
console.log("CA Path:", caPath);
console.log("File exists?", fs.existsSync(caPath));
// ------------------------

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    ca: fs.readFileSync(caPath)
  }
});

db.connect(err => {
  if (err) {
    console.error("❌ MySQL connection error:", err);
  } else {
    console.log("✅ Connected to Aiven MySQL");
  }
});

module.exports = db;
