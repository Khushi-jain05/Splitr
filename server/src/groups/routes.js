const express = require("express");
const { validateGroup } = require("./middlewares");
const {
  createGroup,
  getAllGroups,
  getSingleGroup
} = require("./controllers");

const router = express.Router();

// CREATE GROUP
router.post("/", validateGroup, createGroup);

// GET ALL GROUPS
router.get("/", getAllGroups);

// GET ONE GROUP
router.get("/:groupId", getSingleGroup);

module.exports = router;
