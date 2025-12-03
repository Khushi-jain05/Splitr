const express = require("express");
const router = express.Router();

const { validateGroup } = require("./middlewares");
const {
  createGroup,
  getAllGroups,
  getSingleGroup,
  deleteGroup
} = require("./controllers");
router.post("/", validateGroup, createGroup);
router.delete("/:groupId", deleteGroup);
router.get("/", getAllGroups);
router.get("/:groupId", getSingleGroup);


module.exports = router;
