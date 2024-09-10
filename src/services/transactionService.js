export const fetchTransactions = async () => {
  try {
    const response = await fetch("http://localhost:3001/api/transactions");
    if (!response.ok) {
      console.error(`HTTP error! Status: ${response.status}`);
      throw new Error("Failed to fetch transactions");
    }
    const transactions = await response.json();
    return transactions;
  } catch (error) {
    console.error("Error fetching transactions:", error.message);
    throw new Error("Failed to fetch transactions");
  }
};
