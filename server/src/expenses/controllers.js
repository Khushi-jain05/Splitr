const {
  addExpenseService,
  getGroupExpensesService
} = require("./services");

// ADD EXPENSE CONTROLLER
module.exports.addExpense = async (req, res) => {
  try {
    const groupId = req.params.groupId;
    const exp = await addExpenseService(groupId, req.body);

    res.status(201).json(exp);
  } catch (err) {
    console.error("❌ Add Expense Error:", err);
    res.status(500).json({ error: err.message });
  }
};

// GET EXPENSES CONTROLLER
module.exports.getGroupExpenses = async (req, res) => {
  try {
    const groupId = req.params.groupId;
    const expenses = await getGroupExpensesService(groupId);

    res.json(expenses);
  } catch (err) {
    console.error("❌ Get Expenses Error:", err);
    res.status(500).json({ error: err.message });
  }
};
