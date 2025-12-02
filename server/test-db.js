require("dotenv").config();
const db = require("./db/config");

(async () => {
  try {
    const [rows] = await db.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      ["name", "emaasil@gmail.com", "hashedPassword"]);
    console.log("DB TEST RESULT:", rows);
    process.exit(0);
  } catch (err) {
    console.error("DB TEST ERROR:", err);
    process.exit(1);
  }
})();
