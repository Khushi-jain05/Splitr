// server/db/config.js
const mysql = require("mysql2");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

console.log("🔌 Trying Aiven MySQL connection...");
console.log("🔎 Loaded ENV:", {
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_USER: process.env.DB_USER,
  DB_NAME: process.env.DB_NAME,
});

const caPath = path.join(__dirname, "ca.pem");
let caFile;

if (fs.existsSync(caPath)) {
  caFile = fs.readFileSync(caPath, "utf8");
  console.log("✅ CA file detected:", caPath);
} else {
  console.error("❌ CA FILE NOT FOUND:", caPath);
}

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    ca: caFile,
    rejectUnauthorized: true,
    minVersion: "TLSv1.2",
  },
}).promise();

// Test connection
async function connection() {
  try {
    const conn = await pool.getConnection();
    console.log("✨ SUCCESS — Connected to Aiven MySQL!");
    conn.release();
  } catch (err) {
    console.error("❌ MySQL connection FAILED:", err);
  }
}

connection();

module.exports = pool;
