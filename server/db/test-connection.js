require("dotenv").config();
const pool = require("./config");   // <-- your promise pool (db/config.js)

(async () => {
  try {
    console.log("🔌 Testing Aiven MySQL connection...");

    // Simple query to confirm connection
    const [rows] = await pool.query("SELECT NOW() AS now");
    console.log("✅ Connected! Server time:", rows[0].now);


    console.log("📌 Creating tables if missing...\n");


    // 1️⃣ trip_groups
    await pool.query(`
        CREATE TABLE IF NOT EXISTS trip_groups (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          user_id INT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);
      


    // 2️⃣ group_members
    await pool.query(`
      CREATE TABLE IF NOT EXISTS group_members (
        id INT AUTO_INCREMENT PRIMARY KEY,
        group_id INT NOT NULL,
        name VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (group_id) REFERENCES trip_groups(id) ON DELETE CASCADE
      );
    `);
    console.log("✔ group_members table OK");


    // 3️⃣ group_expenses
    await pool.query(`
      CREATE TABLE IF NOT EXISTS group_expenses (
        id INT AUTO_INCREMENT PRIMARY KEY,
        group_id INT NOT NULL,
        title VARCHAR(255) NOT NULL,
        amount DECIMAL(10,2) NOT NULL,
        category VARCHAR(100),
        paid_by VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (group_id) REFERENCES trip_groups(id) ON DELETE CASCADE
      );
    `);
    console.log("✔ group_expenses table OK");


    console.log("\n🎉 ALL TABLES READY!");
    process.exit(0);

  } catch (err) {
    console.error("❌ TEST ERROR:", err);
    process.exit(1);
  }
})();
