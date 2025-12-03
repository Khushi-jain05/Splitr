const express = require("express");
const router = express.Router();

const { validateGroup } = require("./middlewares");
const {
  createGroup,
  getAllGroups,
  getSingleGroup
} = require("./controllers");

// CREATE GROUP
router.post("/", validateGroup, createGroup);

// GET ALL GROUPS
router.get("/", getAllGroups);

// GET ONE GROUP
router.get("/:groupId", getSingleGroup);

module.exports = router;
