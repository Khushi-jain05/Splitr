const express = require("express");
const router = express.Router();

const {
  validateCreateGroup,
  validateAddMember
} = require("./middlewares");

const {
  createGroup,
  getAllGroups,
  getSingleGroup,
  addMember
} = require("./controllers");

// CREATE GROUP
router.post("/", validateCreateGroup, createGroup);

// GET ALL GROUPS
router.get("/", getAllGroups);

// GET SINGLE GROUP
router.get("/:groupId", getSingleGroup);

// ADD MEMBER
router.post("/:groupId/members", validateAddMember, addMember);

module.exports = router;
