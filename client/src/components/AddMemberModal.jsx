import React, { useState } from "react";
import "../styles/AddMemberModal.css";
import { API_BASE } from "../utils/api";

function AddMemberModal({ groupId, onClose, refresh }) {
  const [name, setName] = useState("");

  const handleAdd = async () => {
    if (!name.trim()) {
      alert("Please enter a member name");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/groups/${groupId}/members`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Unable to add member.");
        return;
      }

     
      if (refresh) refresh();

      onClose();
    } catch (err) {
      console.error("ADD MEMBER ERROR:", err);
      alert("Server error. Please try again.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>Add Member</h2>

        <input
          placeholder="Member Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div className="actions">
          <button className="cancel" onClick={onClose}>Cancel</button>
          <button className="save" onClick={handleAdd}>Add</button>
        </div>
      </div>
    </div>
  );
}

export default AddMemberModal;
