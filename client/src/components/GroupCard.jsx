import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Groups.css";

function GroupCard({ group }) {
  const navigate = useNavigate();

  return (
    <div className="group-card" onClick={() => navigate(`/groups/${group.id}`)}>
      <h3>{group.name}</h3>
      <p>{group.memberCount || 0} Members</p>
      <p className="spent-text">Total Spent: ₹{group.totalSpent || 0}</p>
    </div>
  );
}

export default GroupCard;
