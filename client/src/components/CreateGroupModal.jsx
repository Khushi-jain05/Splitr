import React, { useState } from "react";
import "../styles/CreateGroupModal.css";
import { API_BASE } from "../utils/api";

function CreateGroupModal({ close, refresh }) {
  const [name, setName] = useState("");

  const createGroup = async () => {
    if (!name.trim()) {
      alert("Enter a group name");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.id;

    if (!userId) {
      alert("User not logged in");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/groups`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, userId }),   // ⭐ SEND USER ID
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Unable to create group");
        return;
      }

      refresh();  
      close();

    } catch (err) {
      console.error("CREATE GROUP ERROR:", err);
      alert("Server error");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>Create Group</h2>

        <label>Group Name</label>
        <input
          placeholder="e.g., Goa Friends"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div className="modal-actions">
          <button className="cancel-btn" onClick={close}>Cancel</button>
          <button className="save-btn" onClick={createGroup}>Create</button>
        </div>
      </div>
    </div>
  );
}

export default CreateGroupModal;
