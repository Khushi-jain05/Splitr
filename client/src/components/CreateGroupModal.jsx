import React, { useState } from "react";
import "../styles/CreateGroupModal.css";

function CreateGroupModal({ close, refresh }) {
  const [name, setName] = useState("");

  const createGroup = async () => {
    if (!name.trim()) {
      alert("Enter a group name");
      return;
    }

    const res = await fetch("http://localhost:1000/groups", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name })
    });

    const data = await res.json();
    if (res.ok) {
      refresh();
      close();
    } else {
      alert(data.error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>Create Group</h2>

        <label>Group Name</label>
        <input 
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., Goa Friends"
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
