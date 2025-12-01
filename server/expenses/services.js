const db = require("../../db/config");

module.exports.addExpenseService = (groupId, data) => {
  return new Promise((resolve, reject) => {
    const sql = `
      INSERT INTO expenses (groupId, title, amount, category, paidBy)
      VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [groupId, data.title, data.amount, data.category, data.paidBy],
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
      "SELECT * FROM expenses WHERE groupId = ?",
      [groupId],
      (err, rows) => {
        if (err) return reject(err);

        resolve(rows);
      }
    );
  });
};

