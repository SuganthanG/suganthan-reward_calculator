
export const calculatePointsForTransaction = (amount) => {
    let points = 0;
  
    if (amount > 100) {
      points += (amount - 100) * 2; // 2 points for every dollar spent over $100
      points += 50; // 1 point for every dollar spent between $50 and $100
    } else if (amount > 50) {
      points += (amount - 50); // 1 point for every dollar spent between $50 and $100
    }
  
    return points;
  };
  
  export const calculateRewardPoints = (transactions) => {
    const pointsPerCustomer = {};
    let overallTotalPoints = 0;
  
    transactions.forEach(({ customerId, amount, date }) => {
      const month = new Date(date).getMonth(); // Get the month (0-11)
  
      if (!pointsPerCustomer[customerId]) {
        pointsPerCustomer[customerId] = {};
      }
  
      if (!pointsPerCustomer[customerId][month]) {
        pointsPerCustomer[customerId][month] = 0;
      }
  
      const points = calculatePointsForTransaction(amount);
      pointsPerCustomer[customerId][month] += points;
      overallTotalPoints += points;
    });
  
    return { pointsPerCustomer, overallTotalPoints };
  };
  