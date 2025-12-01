import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/TripCard.css";

function TripCard({ id, name, total, members, dates }) {
  const navigate = useNavigate();

  return (
    <div className="tripcard">
      <div className="tripcard-content">

        <h3 className="tripcard-title">{name}</h3>

        <div className="tripcard-info">
          <p><strong>Total Spent:</strong> ₹{total}</p>
          <p><strong>Members:</strong> {members}</p>
          <p><strong>Dates:</strong> {dates}</p>
        </div>

        <button 
          className="tripcard-btn"
          onClick={() => navigate(`/trip/${id}`)}
        >
          View Trip →
        </button>

      </div>
    </div>
  );
}

export default TripCard;
