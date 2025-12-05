const express = require("express");
const router = express.Router();

const { validateAddExpense } = require("./middlewares");
const { addExpense, getGroupExpenses } = require("./controllers");

// ADD EXPENSE
router.post("/:groupId", validateAddExpense, addExpense);

// GET ALL EXPENSES OF A GROUP
router.get("/:groupId", getGroupExpenses);

module.exports = router;
