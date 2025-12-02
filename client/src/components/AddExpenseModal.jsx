import React, { useState } from "react";
import "../styles/AddExpenseModal.css";

function AddExpenseModal({ groupId, onClose }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [paid_by, setPaidBy] = useState("");

  const handleAdd = async () => {
    await fetch(`http://localhost:1000/expenses/${groupId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, amount, category, paid_by }),
    });

    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">

        <h2>Add Expense</h2>

        <input placeholder="Title"
               value={title}
               onChange={(e) => setTitle(e.target.value)} />

        <input placeholder="Amount"
               type="number"
               value={amount}
               onChange={(e) => setAmount(e.target.value)} />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>Food</option>
          <option>Stay</option>
          <option>Travel</option>
          <option>Adventure</option>
          <option>Shopping</option>
          <option>Misc</option>
        </select>

        <input placeholder="Paid By"
               value={paid_by}
               onChange={(e) => setPaidBy(e.target.value)} />

        <div className="actions">
          <button className="cancel" onClick={onClose}>Cancel</button>
          <button className="save" onClick={handleAdd}>Add</button>
        </div>

      </div>
    </div>
  );
}

export default AddExpenseModal;
