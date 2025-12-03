// server/src/groups/services.js
const pool = require("../../config/db");   // ✅ correct path to promise pool

// CREATE GROUP
module.exports.createGroupService = async (name) => {
  try {
    const [result] = await pool.query(
      "INSERT INTO trip_groups (name) VALUES (?)",
      [name]
    );
    return { id: result.insertId, name };
  } catch (err) {
    console.error("❌ createGroupService ERROR:", err);
    throw err;
  }
};

// GET ALL GROUPS
module.exports.getAllGroupsService = async () => {
  const [rows] = await pool.query("SELECT * FROM trip_groups ORDER BY id DESC");
  return rows;
};

// GET SINGLE GROUP
module.exports.getSingleGroupService = async (groupId) => {
  const [[group]] = await pool.query(
    "SELECT * FROM trip_groups WHERE id = ?",
    [groupId]
  );
  return group;
};
module.exports.deleteGroupService = async (id) => {
  const [result] = await pool.query(
    "DELETE FROM trip_groups WHERE id = ?",
    [id]
  );
  return result;
};
module.exports.addMemberService = async (groupId, name) => {
  const [result] = await pool.query(
    "INSERT INTO group_members (group_id, name) VALUES (?, ?)",
    [groupId, name]
  );
  return { id: result.insertId, name };
};
