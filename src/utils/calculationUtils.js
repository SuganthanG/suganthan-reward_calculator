// Function to calculate reward points for a single transaction
export const calculatePointsForTransaction = (amount) => {
  let points = 0;

  if (amount > 100) {
    // 2 points for every dollar spent over $100
    points += (amount - 100) * 2;
    // 1 point for every dollar spent between $50 and $100
    points += 50;
  } else if (amount > 50) {
    // 1 point for every dollar spent between $50 and $100
    points += (amount - 50);
  }

  return points;
};

// Function to calculate reward points for multiple transactions
export const calculateRewardPoints = (transactions) => {
  const rewardPointsByCustomer = {};
  let totalRewardPoints = 0;

  transactions.forEach(({ customerId, transactionAmount, transactionDate }) => {
    const transactionMonth = new Date(transactionDate).getMonth(); // Extract the month (0-11)

    if (!rewardPointsByCustomer[customerId]) {
      rewardPointsByCustomer[customerId] = {};
    }

    if (!rewardPointsByCustomer[customerId][transactionMonth]) {
      rewardPointsByCustomer[customerId][transactionMonth] = 0;
    }

    const transactionPoints = calculatePointsForTransaction(transactionAmount);
    console.log({transactionPoints})
    rewardPointsByCustomer[customerId][transactionMonth] += transactionPoints;
    totalRewardPoints += transactionPoints;
  });
console.log({rewardPointsByCustomer},{totalRewardPoints})
  return { rewardPointsByCustomer, totalRewardPoints };
};
