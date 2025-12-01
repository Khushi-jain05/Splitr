import React from "react";
import Navbar from "../components/Navbar";
import "../styles/Landing.css";
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      {/* Navbar should stay above everything */}
      <div className="landing-navbar-wrapper">
        <Navbar />
      </div>

      {/* ---------------- HERO SECTION ---------------- */}
      <section className="hero-section neo-portal-hero">

{/* LEFT TEXT */}
<div className="portal-left">
  <h1>
    Split Travel Costs<br />
    With Futuristic Precision.
  </h1>

  <p>
    AI-powered expense tracking, real-time cost sharing, and neon-grade
    clarity. Split smarter, travel lighter, and enjoy more moments.
  </p>

  <button onClick={() => navigate("/dashboard")} className="portal-btn">
    Get Started
  </button>
</div>

{/* RIGHT 3D NEON PORTAL */}
<div className="portal-right">
  <div className="portal-base"></div>
  <div className="portal-ring"></div>
  <div className="portal-core"></div>
</div>

</section>

      {/* ---------------- BENEFITS SECTION ---------------- */}
      <section className="benefits-section">
        <h2 className="section-title">Why Choose Splitr?</h2>

        <div className="benefit-grid">
          <div className="benefit-card">
            <h3>Real-Time Expense Tracking</h3>
            <p>Know exactly where your money is going during the trip.</p>
          </div>

          <div className="benefit-card">
            <h3>Auto-Smart Splitting</h3>
            <p>Split costs only with the people who shared the expense.</p>
          </div>

          <div className="benefit-card">
            <h3>Fair & Clear Settlements</h3>
            <p>Simplify balances using optimized settlement suggestions.</p>
          </div>

          <div className="benefit-card">
            <h3>Travel Insights</h3>
            <p>Get category breakdowns, trends, and smart predictions.</p>
          </div>
        </div>
      </section>

      {/* ---------------- FEATURE CARDS ---------------- */}
      <section className="features-section">
        <h2 className="section-title">Features Built for Travelers</h2>

        <div className="features-grid">
          {[
            {
              title: "Group Trip Management",
              desc: "Create groups, add friends, and manage shared expenses.",
            },
            {
              title: "Category Tracking",
              desc: "Track food, stay, travel & activity expenses separately.",
            },
            {
              title: "Smart Budget Alerts",
              desc: "AI detects overspending and warns you instantly.",
            },
            {
              title: "Receipt Scanner",
              desc: "Upload invoices — Splitr extracts the amount automatically.",
            },
            {
              title: "Travel Calculators",
              desc: "Estimate trip cost per person before you even start.",
            },
            {
              title: "One-Tap Settle Up",
              desc: "UPI-enabled instant settlement with group members.",
            },
          ].map((f, i) => (
            <div key={i} className="feature-card">
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- TESTIMONIALS ---------------- */}
      <section className="testimonials-section">
        <h2 className="section-title">What Travelers Say</h2>

        <div className="testimonials-grid">
          <div className="testimonial">
            <p>
              “Splitr made our Goa trip unbelievably easy. No confusion, no fights —
              just perfect tracking.”
            </p>
            <h4>— Priya S.</h4>
          </div>

          <div className="testimonial">
            <p>
              “The category insights helped us control unnecessary spending. Loved it!”
            </p>
            <h4>— Rahul T.</h4>
          </div>

          <div className="testimonial">
            <p>
              “Best expense-splitting tool for friends. Settling up is super smooth.”
            </p>
            <h4>— Aisha M.</h4>
          </div>
        </div>
      </section>

      {/* ---------------- CTA SECTION ---------------- */}
      <section className="cta-section">
        <h2>Ready to Split Smarter?</h2>
        <p>Join thousands of travelers planning stress-free trips using Splitr.</p>

        <button
          className="primary-btn big"
          onClick={() => navigate("/dashboard")}
        >
          Start Your Trip
        </button>
      </section>
    </div>
  );
}

export default Landing;
