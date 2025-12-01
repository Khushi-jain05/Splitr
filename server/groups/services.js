const db = require("../../db/config");

// Create Group
module.exports.createGroupService = (name) => {
  return new Promise((resolve, reject) => {
    db.query("INSERT INTO groups (name) VALUES (?)", [name], (err, result) => {
      if (err) return reject(err);

      resolve({ id: result.insertId, name });
    });
  });
};

// Get All Groups
module.exports.getAllGroupsService = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM groups", (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
};

// Get Single Group
module.exports.getSingleGroupService = (groupId) => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT g.*, m.id AS memberId, m.memberName
      FROM groups g
      LEFT JOIN group_members m ON g.id = m.groupId
      WHERE g.id = ?
    `;

    db.query(sql, [groupId], (err, rows) => {
      if (err) return reject(err);

      resolve(rows);
    });
  });
};

// Add Member
module.exports.addMemberService = (groupId, name) => {
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO group_members (groupId, memberName) VALUES (?, ?)",
      [groupId, name],
      (err, result) => {
        if (err) return reject(err);

        resolve({ id: result.insertId, memberName: name });
      }
    );
  });
};
