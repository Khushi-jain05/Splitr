module.exports.validateCreateGroup = (req, res, next) => {
    const { name } = req.body;
  
    if (!name || typeof name !== "string" || name.trim() === "") {
      return res.status(400).json({ error: "Invalid group name" });
    }
    next();
  };
  
  module.exports.validateAddMember = (req, res, next) => {
    const { memberName } = req.body;
  
    if (!memberName || typeof memberName !== "string") {
      return res.status(400).json({ error: "Invalid member name" });
    }
    next();
  };

  