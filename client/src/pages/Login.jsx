import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";  // ⭐ FIXED
import "../styles/Auth.css";

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
        : { email: "", phone: form.phone, password: form.password }; // ❗ phone not supported yet

    try {
      const res = await axios.post("http://localhost:5001/api/auth/login", payload);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert("Invalid credentials.");
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

        {/* ⭐ FIXED ONLY THIS LINE — NO UI CHANGE */}
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
