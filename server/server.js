const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Import DB (optional but recommended)
require("./db/config");  // ensures DB connects on startup

const app = express();

// --------------------
// CORS CONFIG
// --------------------
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://splitr-git-main-khushijains-projects.vercel.app",
      "https://splitr-sepia.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json());

// --------------------
// HEALTH CHECK
// --------------------
app.get("/", (req, res) => {
  res.send("✅ Splitr backend is running...");
});

// --------------------
// ROUTES
// --------------------
const authRoutes = require("./routes/auth");
const groupRoutes = require("./src/groups/routes");      // ⭐ Add group routes
const expenseRoutes = require("./src/expenses/routes");  // ⭐ Add expense routes

app.use("/api/auth", authRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/expenses", expenseRoutes);

// --------------------
// START SERVER
// --------------------
const PORT = process.env.PORT || 1000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
