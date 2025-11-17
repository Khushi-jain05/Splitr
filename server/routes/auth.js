const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;
const verifyToken = require("../middleware/authMiddleware");

// ------------------------------
// 🔐 Get logged-in user info
// ------------------------------
router.get("/me", verifyToken, (req, res) => {
  const userId = req.user.id;

  db.query(
    "SELECT id, name, email FROM users WHERE id = ?",
    [userId],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });

      if (result.length === 0)
        return res.status(404).json({ message: "User not found" });

      res.json(result[0]);
    }
  );
});

// ------------------------------
// 📝 Signup
// ------------------------------
router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ message: "All fields are required" });

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.length > 0)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword],
      (err) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ message: "User registered successfully" });
      }
    );
  });
});

// ------------------------------
// 🔑 Login
// ------------------------------
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "All fields are required" });

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
    if (err) return res.status(500).json({ error: err });

    if (result.length === 0)
      return res.status(400).json({ message: "User not found" });

    const user = result[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({ message: "Login successful", token });
  });
});
// 🔥 GET LOGGED-IN USER — REQUIRED FOR DASHBOARD
router.get("/me", verifyToken, (req, res) => {
  const userId = req.user.id; // coming from token

  db.query(
    "SELECT id, name, email FROM users WHERE id = ?",
    [userId],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });

      if (result.length === 0)
        return res.status(404).json({ message: "User not found" });

      res.json(result[0]); // send { id, name, email }
    }
  );
});

module.exports = router;
