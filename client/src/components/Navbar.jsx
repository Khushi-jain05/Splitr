import React from "react";
import "../styles/Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="splitr-nav">
      <div className="nav-logo">Splitr</div>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/groups">Groups</Link></li>
        <li><Link to="/activity">Activity</Link></li>
      </ul>
      <div style={{ width: "120px" }}></div>
    </nav>
    
  );
}

export default Navbar;
