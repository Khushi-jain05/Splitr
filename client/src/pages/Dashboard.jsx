import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Dashboard.css";
import Navbar from "../components/Navbar";
import { enableTilt } from "../utils/tilt";
import { useNavigate } from "react-router-dom";   

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();  

  
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await axios.get("https://splitr-2grq.onrender.com/api/auth/me", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });

        console.log("USER FROM BACKEND:", res.data);
        setUser(res.data);
      } catch (err) {
        console.error("USER FETCH FAILED:", err);
      }
    }

    fetchUser();
  }, []);


  useEffect(() => {
    const card = document.querySelector(".visual-wrap");
    if (card) enableTilt(card);
  }, []);

  return (
    <div className="splitr-dashboard">
      <Navbar />

      <main className="dashboard-hero fade-in-up">
        <section className="hero-left">
          
          <p className="hero-kicker">Welcome, {user?.name || "Explorer"}</p>

          <h1 className="hero-title">
            Split Travel Costs.<br />
            Track Budgets.<br />
            Plan Smart.
          </h1>

          <p className="hero-sub">
            Splitr helps you track expenses, manage categories, settle payments instantly,
            and plan trips with real-time budget insights.
          </p>

          <div className="hero-cta">
            
            <button 
              className="splitr-btn primary"
              onClick={() => navigate("/")}    
            >
              Start a Trip
            </button>

            <button className="splitr-btn ghost">How it Works</button>
          </div>
        </section>

        <section className="hero-right">
          <div className="visual-wrap">
            <div className="floating-card">
              <div className="ring"></div>
              <div className="orb"></div>
              <div className="shine"></div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
