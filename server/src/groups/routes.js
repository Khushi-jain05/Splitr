const express = require("express");
const router = express.Router();

const { validateGroup } = require("./middlewares");
const {
  createGroup,
  getAllGroups,
  getSingleGroup,
  deleteGroup,
  getMembers,
  addMember
} = require("./controllers");

// CREATE GROUP
router.post("/", validateGroup, createGroup);

// DELETE GROUP
router.delete("/:groupId", deleteGroup);

// MEMBERS
router.post("/:groupId/members", addMember);
router.get("/:groupId/members", getMembers);

// GET GROUPS
router.get("/", getAllGroups);

// GET SINGLE GROUP
router.get("/:groupId", getSingleGroup);

module.exports = router;
