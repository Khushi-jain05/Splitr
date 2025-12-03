const {
  createGroupService,
  getAllGroupsService,
  getSingleGroupService
} = require("./services");

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
