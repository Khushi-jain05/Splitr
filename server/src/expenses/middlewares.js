module.exports.validateAddExpense = (req, res, next) => {
    const { title, amount, category, paidBy } = req.body;
  
    if (!title || !amount || !category) {
      return res.status(400).json({ error: "Missing required fields" });
    }
  
    if (isNaN(amount)) {
      return res.status(400).json({ error: "Invalid amount" });
    }
  
    next();
  };
  