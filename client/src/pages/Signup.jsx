import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Signup.css";

function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  // ⭐ API BASE URL (local or production)
  const API_URL = process.env.REACT_APP_API_URL;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      await axios.post(`${API_URL}/api/auth/signup`, {
        name: form.name,
        email: form.email,
        password: form.password,
      });

      alert("Signup successful! Please login.");
      navigate("/");
    } catch (err) {
      console.error("SIGNUP ERROR: ", err);
      alert("Signup failed. Try again.");
    }
  };

  return (
    <div className="splitr-signup-page">
      <h1 className="title-main">JOIN SPLITR</h1>
      <h2 className="title-sub">CREATE YOUR ACCOUNT</h2>
      <p className="title-text">
        Manage shared expenses effortlessly with Splitr
      </p>

      <div className="signup-card">
        <form onSubmit={handleSubmit} className="signup-form">
          
          <label>Full Name</label>
          <input
            name="name"
            placeholder="Enter your full name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <label>Email</label>
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            name="password"
            type="password"
            placeholder="Create password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <label>Confirm Password</label>
          <input
            name="confirmPassword"
            type="password"
            placeholder="Re-enter password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />

          <button type="submit" className="splitr-btn">Sign Up</button>
        </form>

        <p className="login-text">
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>

      <footer className="signup-footer">
        Copyright © 2025 Splitr. All Rights Reserved.
      </footer>
    </div>
  );
}

export default Signup;
