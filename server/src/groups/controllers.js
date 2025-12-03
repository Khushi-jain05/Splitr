const {
  createGroupService,
  getAllGroupsService,
  getSingleGroupService,
  deleteGroupService
} = require("./services");
const pool = require("../../config/db");
// CREATE GROUP
exports.createGroup = async (req, res) => {
  try {
    const { name } = req.body;
    const group = await createGroupService(name);
    res.status(201).json(group);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE GROUP
exports.deleteGroup = async (req, res) => {
  try {
    await pool.query("DELETE FROM trip_groups WHERE id = ?", [
      req.params.groupId,
    ]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.addMember = async (req, res) => {
  try {
    const { name } = req.body;
    const { groupId } = req.params;

    const member = await addMemberService(groupId, name);

    res.status(201).json(member);
  } catch (err) {
    console.error("❌ Add Member Error:", err);
    res.status(500).json({ error: err.message });
  }
};
exports.getMembers = async (req, res) => {
  try {
    const { groupId } = req.params;

    const [members] = await pool.query(
      "SELECT * FROM group_members WHERE group_id = ?",
      [groupId]
    );

    res.json(members);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ALL GROUPS
exports.getAllGroups = async (req, res) => {
  try {
    const groups = await getAllGroupsService();
    res.json(groups);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET SINGLE GROUP
exports.getSingleGroup = async (req, res) => {
  try {
    const group = await getSingleGroupService(req.params.groupId);
    res.json(group);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
