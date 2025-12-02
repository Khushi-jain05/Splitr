import React, { useState } from "react";
import "../styles/AddMemberModal.css";

function AddMemberModal({ groupId, onClose }) {
  const [name, setName] = useState("");

  const handleAdd = async () => {
    await fetch(`http://localhost:1000/groups/${groupId}/members`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    onClose();
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
