import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "../styles/Dashboard.css";
import { useNavigate } from "react-router-dom";
import TripCard from "../components/TripCard";
import getUserId from "../utils/getUserId";   // ⭐ ADDED

function Dashboard() {

  const navigate = useNavigate();
  const userId = getUserId();  // ⭐ ADDED

  /* ===================================================
      LOAD TRIPS FROM localStorage (USER SPECIFIC)
  ======================================================*/
  const [trips, setTrips] = useState(() => {
    return JSON.parse(localStorage.getItem(`trips-${userId}`)) || [];
  });

  /* ===================================================
      SAVE TRIPS (USER SPECIFIC)
  ======================================================*/
  useEffect(() => {
    if (!userId) return;
    localStorage.setItem(`trips-${userId}`, JSON.stringify(trips));
  }, [trips, userId]);

  /* ===========================
      🔍 SEARCH BAR STATE
  ============================*/
  const [searchQuery, setSearchQuery] = useState("");

  /* ===================================================
      CREATE TRIP MODAL
  ======================================================*/
  const [showTripModal, setShowTripModal] = useState(false);
  const [tripName, setTripName] = useState("");
  const [tripDates, setTripDates] = useState("");

  const handleCreateTrip = () => {
    if (!tripName.trim()) return alert("Trip name is required");

    const newTrip = {
      id: tripName.toLowerCase().replace(/\s+/g, "-"),
      name: tripName,
      total: 0,
      members: 1,
      dates: tripDates || "Not set"
    };

    setTrips(prev => [...prev, newTrip]);

    setTripName("");
    setTripDates("");
    setShowTripModal(false);
  };

  /* ===================================================
      ⭐ DELETE TRIP FUNCTION (NEW)
  ======================================================*/
  const deleteTrip = (id) => {
    if (!window.confirm("Are you sure you want to delete this trip?")) return;

    const updatedTrips = trips.filter((t) => t.id !== id);
    setTrips(updatedTrips);
  };

  /* ===================================================
      EXPENSE MODAL (OLD)
  ======================================================*/
  const [showModal, setShowModal] = useState(false);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [paidBy, setPaidBy] = useState("You");
  const [splitMethod, setSplitMethod] = useState("Equal");
  const [expenses, setExpenses] = useState([]);

  const handleSaveExpense = () => {
    if (!title || !amount) {
      alert("Please enter all fields");
      return;
    }

    const newExpense = {
      title,
      amount: Number(amount),
      category,
      paidBy,
      splitMethod,
      createdAt: new Date().toISOString(),
    };

    setExpenses(prev => [...prev, newExpense]);
    setShowModal(false);

    setTitle("");
    setAmount("");
    setCategory("Food");
    setPaidBy("You");
    setSplitMethod("Equal");
  };


  return (
    <div className="dashboard-page">
      <Navbar />

      {/* HEADER */}
      <div className="dash-header">
        <h1>Your Dashboard</h1>

        <div className="header-buttons">
          <button className="trip-btn" onClick={() => setShowTripModal(true)}>
            + Create Trip
          </button>

          <button className="add-btn" onClick={() => setShowModal(true)}>
            + Add Expense
          </button>
        </div>
      </div>

      {/* ACTIVE TRIPS */}
      <section className="section-block">
        <h2>Active Trips</h2>

        {/* 🔍 SEARCH BAR */}
        <input
          type="text"
          className="search-bar"
          placeholder="Search trips by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {trips.length === 0 && (
          <p className="empty-text">No trips created yet.</p>
        )}

        <div className="trip-grid">
          {trips
            .filter(trip =>
              trip.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((trip) => (
              <TripCard
                key={trip.id}
                id={trip.id}
                name={trip.name}
                total={trip.total}
                members={trip.members}
                dates={trip.dates}
                
                // ⭐ Delete Trip Button handler passed here
                onDelete={() => deleteTrip(trip.id)}
              />
            ))}
        </div>
      </section>

      {/* RECENT EXPENSES */}
      <section className="section-block">
        <h2>Recent Expenses</h2>

        {expenses.length === 0 && <p className="empty-text">No expenses yet.</p>}

        <div className="expense-list">
          {expenses.map((exp, index) => (
            <div key={index} className="expense-item">
              <div>
                <h4>{exp.title}</h4>
                <small>{exp.category} • {exp.splitMethod}</small>
              </div>
              <p className="exp-amount">₹{exp.amount}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CREATE TRIP MODAL */}
      {showTripModal && (
        <div className="modal-overlay">
          <div className="expense-modal">
            <h2>Create New Trip</h2>

            <label>Trip Name</label>
            <input
              value={tripName}
              onChange={(e) => setTripName(e.target.value)}
              placeholder="Goa Trip"
            />

            <label>Trip Dates</label>
            <input
              value={tripDates}
              onChange={(e) => setTripDates(e.target.value)}
              placeholder="Jan 10 - Jan 14"
            />

            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setShowTripModal(false)}>
                Cancel
              </button>
              <button className="save-btn" onClick={handleCreateTrip}>
                Create Trip
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD EXPENSE MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="expense-modal">
            <h2>Add Expense</h2>

            <label>Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} />

            <label>Amount</label>
            <input value={amount} onChange={(e) => setAmount(e.target.value)} />

            <label>Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option>Food</option>
              <option>Stay</option>
              <option>Travel</option>
              <option>Adventure</option>
              <option>Shopping</option>
              <option>Misc</option>
            </select>

            <label>Paid By</label>
            <select value={paidBy} onChange={(e) => setPaidBy(e.target.value)}>
              <option>You</option>
              <option>Friend 1</option>
              <option>Friend 2</option>
            </select>

            <label>Split Method</label>
            <select value={splitMethod} onChange={(e) => setSplitMethod(e.target.value)}>
              <option>Equal</option>
              <option>Custom</option>
              <option>Percentage</option>
              <option>Selected Members</option>
            </select>

            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button className="save-btn" onClick={handleSaveExpense}>
                Save
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default Dashboard;
