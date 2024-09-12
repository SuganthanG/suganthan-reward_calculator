// server.js

const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001; // Use a different port to avoid conflicts with the React app

app.use(cors()); // Enable CORS for all routes

// Mock data to be served
const transactions = [
  { customerId: "cust101", transactionAmount: 120, transactionDate: "2024-06-15" },
  { customerId: "cust101", transactionAmount: 75, transactionDate: "2024-06-25" },
  { customerId: "cust101", transactionAmount: 150, transactionDate: "2024-06-10" },
  { customerId: "cust101", transactionAmount: 50, transactionDate: "2024-07-05" },
  { customerId: "cust102", transactionAmount: 95, transactionDate: "2024-07-14" },
  { customerId: "cust102", transactionAmount: 220, transactionDate: "2024-07-29" },
  { customerId: "cust102", transactionAmount: 123, transactionDate: "2024-08-12" },
  { customerId: "cust102", transactionAmount: 85, transactionDate: "2024-01-15" },
  { customerId: "cust103", transactionAmount: 40, transactionDate: "2024-03-22" },
  { customerId: "cust103", transactionAmount: 199, transactionDate: "2024-04-22" },
  { customerId: "cust103", transactionAmount: 99, transactionDate: "2024-05-12" },
  { customerId: "cust104", transactionAmount: 111, transactionDate: "2024-08-12" },
  { customerId: "cust104", transactionAmount: 12, transactionDate: "2024-06-12" },
  { customerId: "cust105", transactionAmount: 212, transactionDate: "2024-09-12" },
  { customerId: "cust106", transactionAmount: 63, transactionDate: "2024-03-12" },
  { customerId: "cust106", transactionAmount: 133, transactionDate: "2024-04-12" },
  { customerId: "cust107", transactionAmount: 145, transactionDate: "2024-06-12" },
  { customerId: "cust107", transactionAmount: 1, transactionDate: "2024-08-12" },



];

// Endpoint to get all transactions
app.get("/api/transactions", (req, res) => {
  res.json(transactions);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
