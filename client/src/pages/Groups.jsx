import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import "../styles/Groups.css";
import { API_BASE } from "../utils/api";

function Groups() {
  const [groups, setGroups] = useState([]);
  const [groupName, setGroupName] = useState("");
  const navigate = useNavigate();

  const API = API_BASE;

  // Fetch all groups
  const fetchGroups = async () => {
    try {
        const user = JSON.parse(localStorage.getItem("user"));
        const res = await fetch(`${API}/api/groups?userId=${user?.id}`);
        
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchGroups();
  }, []);

  const createGroup = async () => {
    if (!groupName.trim()) {
      alert("Enter a group name");
      return;
    }
  
    try {
      const user = JSON.parse(localStorage.getItem("user"));
  
      const res = await fetch(`${API}/api/groups`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: groupName,
          userId: user?.id
        }),
      });
  
      const data = await res.json();
      console.log("Group created:", data);
  
      setGroupName("");
      fetchGroups();
    } catch (err) {
      console.error("Create Group Error:", err);
    }
  };
  

  // Delete Group
  const deleteGroup = async (groupId) => {
    if (!window.confirm("Are you sure you want to delete this group?")) return;

    try {
      await fetch(`${API}/api/groups/${groupId}`, {
        method: "DELETE",
      });

      fetchGroups();
    } catch (err) {
      console.error("Delete Group Error:", err);
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

              <div className="group-card-actions">
                <button onClick={() => navigate(`/group/${g.id}`)}>
                  Open Group
                </button>

                <button
                  className="delete-btn"
                  onClick={() => deleteGroup(g.id)}
                  style={{ background: "#ff4d4d", color: "white" }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Groups;
