import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import AddMemberModal from "../components/AddMemberModal";
import AddExpenseModal from "../components/AddExpenseModal";
import "../styles/GroupOverview.css";

function GroupOverview() {
  const { id } = useParams(); // groupId from URL

  const [group, setGroup] = useState(null);
  const [members, setMembers] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const [showMemberModal, setShowMemberModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);

  /* =======================================================
     FETCH GROUP DETAILS
  ======================================================= */
  const fetchGroup = async () => {
    const res = await fetch(`http://localhost:1000/groups`);
    const data = await res.json();
    const found = data.find((g) => g.id === Number(id));
    setGroup(found || null);
  };

  /* =======================================================
     FETCH MEMBERS
  ======================================================= */
  const fetchMembers = async () => {
    const res = await fetch(`http://localhost:1000/groups/${id}/members`);
    const data = await res.json();
    setMembers(data);
  };

  /* =======================================================
     FETCH EXPENSES
  ======================================================= */
  const fetchExpenses = async () => {
    const res = await fetch(`http://localhost:1000/expenses/${id}`);
    const data = await res.json();
    setExpenses(data);
  };

  useEffect(() => {
    fetchGroup();
    fetchMembers();
    fetchExpenses();
  }, []);

  /* =======================================================
     CATEGORY TOTALS
  ======================================================= */
  const categories = ["Food", "Stay", "Travel", "Adventure", "Shopping", "Misc"];

  const categoryTotals = categories.reduce((acc, cat) => {
    acc[cat] = expenses
      .filter((e) => e.category === cat)
      .reduce((sum, e) => sum + Number(e.amount), 0);
    return acc;
  }, {});

  /* =======================================================
     WHO OWES WHOM CALC (Simple Equal Split)
  ======================================================= */
  const totalSpent = expenses.reduce((sum, e) => sum + Number(e.amount), 0);
  const perPerson = members.length ? totalSpent / members.length : 0;

  const balances = members.map((m) => {
    const paidByMember = expenses
      .filter((e) => e.paid_by === m.name)
      .reduce((sum, e) => sum + Number(e.amount), 0);

    return {
      name: m.name,
      paid: paidByMember,
      balance: paidByMember - perPerson, // +ve means they should receive, -ve means they owe
    };
  });

  return (
    <div className="group-page">
      <Navbar />

      {group ? (
        <>
          {/* HEADER */}
          <div className="group-header">
            <h1>{group.name}</h1>
            <button className="add-btn" onClick={() => setShowExpenseModal(true)}>
              + Add Expense
            </button>
          </div>

          {/* MEMBERS BLOCK */}
          <section className="members-section">
            <div className="member-head">
              <h2>Group Members</h2>
              <button className="add-small" onClick={() => setShowMemberModal(true)}>
                + Add Member
              </button>
            </div>

            <div className="member-list">
              {members.map((m) => (
                <div key={m.id} className="member-card">
                  {m.name}
                </div>
              ))}
            </div>
          </section>

          {/* CATEGORY BLOCK */}
          <section className="category-section">
            <h2>Category Breakdown</h2>

            <div className="category-grid">
              {categories.map((c) => (
                <div key={c} className="category-card">
                  <h4>{c}</h4>
                  <p>₹{categoryTotals[c] || 0}</p>
                </div>
              ))}
            </div>
          </section>

          {/* WHO OWES WHOM */}
          <section className="balance-section">
            <h2>Who Owes Whom</h2>

            {balances.map((b) => (
              <div
                key={b.name}
                className={`balance-item ${b.balance >= 0 ? "positive" : "negative"}`}
              >
                <span>{b.name}</span>
                <span>
                  {b.balance >= 0
                    ? `Gets ₹${b.balance.toFixed(0)}`
                    : `Owes ₹${Math.abs(b.balance).toFixed(0)}`}
                </span>
              </div>
            ))}
          </section>

          {/* EXPENSE LIST */}
          <section className="expense-section">
            <h2>All Expenses</h2>

            {expenses.length === 0 && <p className="empty">No expenses yet.</p>}

            <div className="expense-list">
              {expenses.map((e) => (
                <div key={e.id} className="expense-item">
                  <div>
                    <h4>{e.title}</h4>
                    <small>{e.category} · paid by {e.paid_by}</small>
                  </div>
                  <p className="amt">₹{e.amount}</p>
                </div>
              ))}
            </div>
          </section>
        </>
      ) : (
        <p className="loading">Loading...</p>
      )}

      {/* MODALS */}
      {showMemberModal && (
        <AddMemberModal
          groupId={id}
          onClose={() => {
            setShowMemberModal(false);
            fetchMembers();
          }}
        />
      )}

      {showExpenseModal && (
        <AddExpenseModal
          groupId={id}
          onClose={() => {
            setShowExpenseModal(false);
            fetchExpenses();
          }}
        />
      )}
    </div>
  );
}

export default GroupOverview;
