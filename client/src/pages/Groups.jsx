import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import GroupCard from "../components/GroupCard";
import CreateGroupModal from "../components/CreateGroupModal";
import "../styles/Groups.css";

function Groups() {
  const [groups, setGroups] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  // Fetch groups from backend
  useEffect(() => {
    fetch("http://localhost:1000/groups")
      .then(res => res.json())
      .then(data => setGroups(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="groups-page">
      <Navbar />

      <div className="groups-header">
        <h1>Your Groups</h1>
        <button className="create-btn" onClick={() => setOpenModal(true)}>
          + Create Group
        </button>
      </div>

      <div className="groups-grid">
        {groups.length === 0 && (
          <p className="empty-text">No groups yet. Create your first one!</p>
        )}

        {groups.map((g, i) => (
          <GroupCard key={i} group={g} />
        ))}
      </div>

      {openModal && (
        <CreateGroupModal 
          close={() => setOpenModal(false)}
          refresh={() => window.location.reload()}
        />
      )}
    </div>
  );
}

export default Groups;
