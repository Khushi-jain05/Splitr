const {
    addExpenseService,
    getGroupExpensesService
  } = require("./services");
  
  module.exports.addExpense = async (req, res) => {
    try {
      const exp = await addExpenseService(req.params.groupId, req.body);
      res.status(201).json(exp);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  module.exports.getGroupExpenses = async (req, res) => {
    try {
      const expenses = await getGroupExpensesService(req.params.groupId);
      res.json(expenses);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  