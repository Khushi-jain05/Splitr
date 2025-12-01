import React from "react";
import "../styles/Dashboard.css";

function ExpenseModal({ close }) {
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>Add Expense</h2>

        <label>Title</label>
        <input type="text" placeholder="e.g. Lunch at café" />

        <label>Amount</label>
        <input type="number" placeholder="₹" />

        <label>Category</label>
        <select>
          <option>Food</option>
          <option>Stay</option>
          <option>Travel</option>
          <option>Adventure</option>
          <option>Shopping</option>
          <option>Misc</option>
        </select>

        <label>Paid By</label>
        <select>
          <option>You</option>
          <option>Group Member</option>
        </select>

        <label>Split Method</label>
        <select>
          <option>Equal</option>
          <option>Custom</option>
          <option>Percentage</option>
          <option>Selected Members</option>
        </select>

        <div className="modal-actions">
          <button className="cancel-btn" onClick={close}>Cancel</button>
          <button className="save-btn">Save</button>
        </div>
      </div>
    </div>
  );
}

export default ExpenseModal;
