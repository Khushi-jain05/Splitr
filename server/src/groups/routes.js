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

router.post("/", validateGroup, createGroup);
router.delete("/:groupId", deleteGroup);
router.post("/:groupId/members", addMember);
router.get("/:groupId/members", getMembers);
router.get("/", getAllGroups);
router.get("/:groupId", getSingleGroup);

module.exports = router;   // ← VERY IMPORTANT
