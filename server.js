// server.js

const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001; // Use a different port to avoid conflicts with the React app

app.use(cors()); // Enable CORS for all routes

// Mock data to be served
const transactions = [
  { customerId: "1", amount: 120, date: "2024-06-15" },
  { customerId: "1", amount: 75, date: "2024-06-25" },
  { customerId: "2", amount: 150, date: "2024-06-10" },
  { customerId: "2", amount: 50, date: "2024-07-05" },
  { customerId: "3", amount: 95, date: "2024-07-14" },
  { customerId: "3", amount: 200, date: "2024-07-29" },
  { customerId: "1", amount: 130, date: "2024-08-12" },
  { customerId: "2", amount: 85, date: "2024-08-15" },
  { customerId: "3", amount: 40, date: "2024-08-22" },
];

// Endpoint to get all transactions
app.get("/api/transactions", (req, res) => {
  res.json(transactions);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
