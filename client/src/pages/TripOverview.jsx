import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/TripOverview.css";

// Chart.js
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function TripOverview() {
  const { id } = useParams();

  const categories = ["Food", "Stay", "Travel", "Adventure", "Shopping", "Misc"];

  // EXPENSE STATE
  const [expenses, setExpenses] = useState([]);

  // CATEGORY TOTALS (LIVE)
  const [categoryTotals, setCategoryTotals] = useState({
    Food: 0,
    Stay: 0,
    Travel: 0,
    Adventure: 0,
    Shopping: 0,
    Misc: 0,
  });

  // MODAL STATE
  const [showModal, setShowModal] = useState(false);

  // FORM STATES
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [paidBy, setPaidBy] = useState("You");
  const [splitMethod, setSplitMethod] = useState("Equal");

  // UPDATE CATEGORY TOTALS
  useEffect(() => {
    const totals = {
      Food: 0,
      Stay: 0,
      Travel: 0,
      Adventure: 0,
      Shopping: 0,
      Misc: 0,
    };

    expenses.forEach((exp) => {
      totals[exp.category] += exp.amount;
    });

    setCategoryTotals(totals);
  }, [expenses]);

  // SAVE NEW EXPENSE
  const handleSave = () => {
    if (!title || !amount) {
      alert("Please enter all fields");
      return;
    }

    const newExp = {
      title,
      amount: Number(amount),
      category,
      paidBy,
      splitMethod,
      createdAt: new Date(),
    };

    setExpenses((prev) => [...prev, newExp]);

    setShowModal(false);
    setTitle("");
    setAmount("");
    setCategory("Food");
    setPaidBy("You");
    setSplitMethod("Equal");
  };

  // PIE CHART CONFIG
  const pieData = {
    labels: categories,
    datasets: [
      {
        label: "Spending",
        data: categories.map((c) => categoryTotals[c]),
        backgroundColor: [
          "rgba(47, 224, 176, 0.9)",
          "rgba(0, 200, 140, 0.9)",
          "rgba(0, 160, 120, 0.9)",
          "rgba(0, 120, 100, 0.9)",
          "rgba(0, 80, 70, 0.9)",
          "rgba(0, 50, 40, 0.9)",
        ],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="trip-page">

      {/* NAVBAR */}
      <div className="trip-navbar-wrapper">
        <Navbar active="dashboard" />
      </div>

      {/* HEADER */}
      <div className="trip-header">
        <h1>{id} Trip Overview</h1>
        <button className="add-btn" onClick={() => setShowModal(true)}>
          + Add Expense
        </button>
      </div>

      {/* SUMMARY */}
      <section className="trip-summary">
        <div className="summary-card">
          <h3>Total Spent</h3>
          <p className="big-amount">
            ₹{Object.values(categoryTotals).reduce((a, b) => a + b, 0)}
          </p>
        </div>

        <div className="summary-card">
          <h3>Members</h3>
          <p>Khushi, Aisha, Rahul</p>
        </div>

        <div className="summary-card">
          <h3>Avg Per Person</h3>
          <p>
            ₹
            {Math.round(
              Object.values(categoryTotals).reduce((a, b) => a + b, 0) / 3
            )}
          </p>
        </div>

        <div className="summary-card">
          <h3>Your Balance</h3>
          <p className="your-balance">You get ₹600</p>
        </div>
      </section>

      {/* CATEGORY BREAKDOWN */}
      <section className="category-block">
        <h2>Category Breakdown</h2>

        <div className="category-grid">
          {categories.map((cat, i) => (
            <div key={i} className="category-card flip-card">
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <h4>{cat}</h4>
                  <p>₹{categoryTotals[cat]}</p>
                </div>
                <div className="flip-card-back">
                  <p>{cat} makes up</p>
                  <h3>
                    {Object.values(categoryTotals).reduce((a, b) => a + b, 0) === 0
                      ? 0
                      : Math.round(
                          (categoryTotals[cat] /
                            Object.values(categoryTotals).reduce(
                              (a, b) => a + b,
                              0
                            )) *
                            100
                        )}
                    %
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ANALYTICS SECTION */}
      <section className="analytics-section">
        <h2>Spending Insights</h2>

        <div className="chart-box">
          <Pie data={pieData} />
        </div>
      </section>

      {/* EXPENSE LIST */}
      <section className="expense-section">
        <h2>All Expenses</h2>

        {expenses.length === 0 && (
          <p className="empty-text">No expenses yet.</p>
        )}

        <div className="expense-list">
          {expenses.map((exp, idx) => (
            <div key={idx} className="expense-item">
              <div>
                <h4>{exp.title}</h4>
                <small>{exp.category} • {exp.splitMethod}</small>
              </div>
              <p className="exp-amount">₹{exp.amount}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2>Add Expense</h2>

            <label>Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} />

            <label>Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <label>Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              {categories.map((c, i) => (
                <option key={i}>{c}</option>
              ))}
            </select>

            <label>Paid By</label>
            <select value={paidBy} onChange={(e) => setPaidBy(e.target.value)}>
              <option>You</option>
              <option>Friend 1</option>
              <option>Friend 2</option>
            </select>

            <label>Split Method</label>
            <select
              value={splitMethod}
              onChange={(e) => setSplitMethod(e.target.value)}
            >
              <option>Equal</option>
              <option>Custom</option>
              <option>Percentage</option>
              <option>Selected Members</option>
            </select>

            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button className="save-btn" onClick={handleSave}>
                Save
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default TripOverview;
