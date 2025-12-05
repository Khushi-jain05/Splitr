const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const groupRoutes = require("./src/groups/routes");
const expenseRoutes = require("./src/expenses/routes");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: ["http://localhost:3000",'https://splitr-3b3y.vercel.app'],
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/expenses", expenseRoutes);


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Server running on ${PORT}`));
