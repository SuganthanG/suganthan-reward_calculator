export const calculatePointsForTransaction = (amount) => {
  let points = 0;
//calculate reward for a transaction
  if (amount > 100) {
    points += (amount - 100) * 2;
    points += 50;
  } else if (amount > 50) {
    points += (amount - 50);
  }

  return points;
};

export const calculateRewardPoints = (transactions) => {
  const rewardPointsByCustomer = {};
  let totalRewardPoints = 0;

  transactions.forEach(({ customerId, transactionAmount, transactionDate }) => {
    const transactionMonth = new Date(transactionDate).getMonth();

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
