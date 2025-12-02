import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/Groups.css";

function Groups() {
  const [groups, setGroups] = useState([]);
  const [groupName, setGroupName] = useState("");

  const API = process.env.REACT_APP_API_URL;

  // Fetch all groups
  const fetchGroups = async () => {
    try {
      const res = await fetch(`${API}/api/groups`);
      const data = await res.json();

      if (!Array.isArray(data)) {
        console.log("Backend returned:", data);
        setGroups([]);
        return;
      }

      setGroups(data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  // Create new group
  const createGroup = async () => {
    if (!groupName.trim()) {
      alert("Enter a group name");
      return;
    }

    try {
      const res = await fetch(`${API}/api/groups`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: groupName }),
      });

      const data = await res.json();
      console.log("Group created:", data);

      setGroupName("");
      fetchGroups();
    } catch (err) {
      console.error("Create Group Error:", err);
    }
  };

  return (
    <div className="groups-page">
      <Navbar />

      <div className="groups-header">
        <h1>Your Groups</h1>

        <div className="group-input-box">
          <input
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="Enter group name..."
          />
          <button onClick={createGroup}>+ Create</button>
        </div>
      </div>

      <div className="groups-list">
        {groups.length === 0 ? (
          <p className="empty-msg">No groups found</p>
        ) : (
          groups.map((g) => (
            <div key={g.id} className="group-card">
              <h3>{g.name}</h3>
              <button onClick={() => (window.location.href = `/group/${g.id}`)}>
                Open Group
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Groups;
