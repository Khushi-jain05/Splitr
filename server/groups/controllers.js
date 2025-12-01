const {
    createGroupService,
    getAllGroupsService,
    getSingleGroupService,
    addMemberService
  } = require("./services");
  
  // CREATE GROUP
  module.exports.createGroup = async (req, res) => {
    try {
      const { name } = req.body;
      const group = await createGroupService(name);
  
      res.status(201).json(group);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  // GET ALL GROUPS
  module.exports.getAllGroups = async (req, res) => {
    try {
      const groups = await getAllGroupsService();
      res.json(groups);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  // GET SINGLE GROUP
  module.exports.getSingleGroup = async (req, res) => {
    try {
      const data = await getSingleGroupService(req.params.groupId);
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  // ADD MEMBER
  module.exports.addMember = async (req, res) => {
    try {
      const result = await addMemberService(
        req.params.groupId,
        req.body.memberName
      );
  
      res.status(201).json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  