const db = require("../../db/config");

module.exports.createGroupService = (name) => {
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO trip_groups (name) VALUES (?)",
      [name],
      (err, result) => {
        if (err) return reject(err);
        resolve({ id: result.insertId, name });
      }
    );
  });
};

module.exports.getAllGroupsService = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM trip_groups", (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
};

module.exports.getSingleGroupService = (groupId) => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT g.*, m.id AS memberId, m.member_name
      FROM trip_groups g
      LEFT JOIN group_members m ON g.id = m.group_id
      WHERE g.id = ?
    `;

    db.query(sql, [groupId], (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
};

module.exports.addMemberService = (groupId, memberName) => {
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO group_members (group_id, member_name) VALUES (?, ?)",
      [groupId, memberName],
      (err, result) => {
        if (err) return reject(err);
        resolve({ id: result.insertId, memberName });
      }
    );
  });
};
