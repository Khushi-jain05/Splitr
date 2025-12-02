import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Auth.css";


const API_URL =
  process.env.REACT_APP_API_URL?.trim() ||
  "http://localhost:3001"; 

function Login() {
  const [form, setForm] = useState({ email: "", phone: "", password: "" });
  const [tab, setTab] = useState("email");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload =
      tab === "email"
        ? { email: form.email, password: form.password }
        : { phone: form.phone, password: form.password };

    try {
      const res = await axios.post(`${API_URL}/api/auth/`, payload);

      localStorage.setItem("token", res.data.token);
      navigate("/home");
    } catch (err) {
      console.error("LOGIN ERROR:", err);
      alert("Invalid credentials or server issue.");
    }
  };

  return (
    <div className="splitr-login-page">
      <h1 className="title-main">LET'S CONNECT</h1>
      <h2 className="title-sub">WITH SPLITR ECOSYSTEM</h2>
      <p className="title-text">
        Seamlessly Enhance the Future Through Our Splitr Technology
      </p>

      <div className="login-card">

        <div className="login-tabs">
          <button
            className={tab === "email" ? "active" : ""}
            onClick={() => setTab("email")}
          >
            Email account
          </button>

          <button
            className={tab === "phone" ? "active" : ""}
            onClick={() => setTab("phone")}
          >
            Phone number
          </button>
        </div>

        <form onSubmit={handleSubmit} className="login-form">

          {tab === "email" && (
            <>
              <label>Email</label>
              <input
                name="email"
                type="email"
                placeholder="Enter your email here"
                required
                onChange={handleChange}
              />
            </>
          )}

          {tab === "phone" && (
            <>
              <label>Phone</label>
              <input
                name="phone"
                type="tel"
                placeholder="Enter phone number"
                required
                onChange={handleChange}
              />
            </>
          )}

          <label>Password</label>
          <input
            name="password"
            type="password"
            placeholder="••••••••"
            required
            onChange={handleChange}
          />

          <a href="#" className="forgot-pass">Forgot Password?</a>

          <button className="splitr-btn" type="submit">Sign In Now</button>
        </form>

        <p className="signup-text">
          Don’t have access yet? <Link to="/signup">Sign Up</Link>
        </p>
      </div>

      <footer className="login-footer">
        Copyright © 2025 Splitr. All Rights Reserved.
      </footer>
    </div>
  );
}

export default Login;
