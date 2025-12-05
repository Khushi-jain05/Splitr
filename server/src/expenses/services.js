const db = require("../../db/config");

module.exports.addExpenseService = (groupId, data) => {
  return new Promise((resolve, reject) => {
    const sql = `
      INSERT INTO group_expenses (group_id, title, amount, category, paid_by)
      VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [groupId, data.title, data.amount, data.category, data.paid_by],
      (err, result) => {
        if (err) return reject(err);

        resolve({ id: result.insertId, ...data });
      }
    );
  });
};

module.exports.getGroupExpensesService = (groupId) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM group_expenses WHERE group_id = ?",
      [groupId],
      (err, rows) => {
        if (err) return reject(err);

        resolve(rows);
      }
    );
  });
};
