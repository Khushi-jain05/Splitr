import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/TripCard.css";
import getUserId from "../utils/getUserId"; // ⭐ added

function TripCard({ id, name, total, members, dates, onDelete }) {
  const navigate = useNavigate();
  const userId = getUserId(); // ⭐ added

  // ⭐ DELETE handler
  const handleDelete = () => {
    if (!window.confirm("Delete this trip?")) return;

    // fetch trips for this user
    const trips = JSON.parse(localStorage.getItem(`trips-${userId}`)) || [];

    // remove the trip
    const updated = trips.filter((t) => t.id !== id);

    // save back
    localStorage.setItem(`trips-${userId}`, JSON.stringify(updated));

    // notify dashboard
    if (onDelete) onDelete(id);
  };

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

        {/* ⭐ ADD DELETE BUTTON (no modification to your existing code) */}
        <button
          className="tripcard-delete-btn"
          onClick={handleDelete}
        >
          Delete
        </button>

      </div>
    </div>
  );
}

export default TripCard;
