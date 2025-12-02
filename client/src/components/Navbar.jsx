import "../styles/Navbar.css";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  RiHome2Line,
  RiDashboardLine, 
  RiTeamLine, 
  RiWallet3Line, 
  RiMoreFill 
} from "react-icons/ri";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  const isActive = (route) => {
    if (route === "/dashboard" && path.startsWith("/trip")) return true; 
    return path === route;
  };

  return (
    <div className="neo-navbar-container">
      <div className="neo-navbar">

        {/* Home */}
        <div 
          className={`neo-item ${isActive("/home") ? "active" : ""}`}
          onClick={() => navigate("/home")}
        >
          <RiHome2Line className="neo-icon" />
          <span>Home</span>
        </div>

        {/* Dashboard */}
        <div 
          className={`neo-item ${isActive("/dashboard") ? "active" : ""}`}
          onClick={() => navigate("/dashboard")}
        >
          <RiDashboardLine className="neo-icon" />
          <span>Dashboard</span>
        </div>

        {/* Groups → FIXED */}
        <div 
          className={`neo-item ${isActive("/groups") ? "active" : ""}`}
          onClick={() => navigate("/groups")}
        >
          <RiTeamLine className="neo-icon" />
          <span>Groups</span>
        </div>

        {/* Travel Expense */}
        <div className="neo-item">
          <RiWallet3Line className="neo-icon" />
          <span>Travel Expense</span>
        </div>

        {/* More */}
        <div className="neo-item">
          <RiMoreFill className="neo-icon" />
          <span>More</span>
        </div>

      </div>
    </div>
  );
};

export default Navbar;
