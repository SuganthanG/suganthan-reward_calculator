
import React, { useEffect, useState } from "react";
import { fetchTransactions } from "./services/transactionService";
import { calculateRewardPoints } from "./utils/calculationUtils";
import { debounce } from "./utils/debounceUtils";

const RewardPointsCalculator = () => {
  const [transactions, setTransactions] = useState([]);
  const [rewardPoints, setRewardPoints] = useState({});
  const [overallTotalPoints, setOverallTotalPoints] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        setLoading(true);
        const data = await fetchTransactions();
        setTransactions(data);
        const { pointsPerCustomer, overallTotalPoints } = calculateRewardPoints(data);
        setRewardPoints(pointsPerCustomer);
        setOverallTotalPoints(overallTotalPoints);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadTransactions();
  }, []);

  const handleSearch = debounce((term) => {
    setSearchTerm(term);
  }, 300);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const filteredRewardPoints = Object.keys(rewardPoints).filter((customerId) =>
    customerId.includes(searchTerm)
  );

  return (
    <>
      <h1>Reward Points Calculator</h1>
      <input
        type="text"
        placeholder="Search by Customer ID"
        onChange={(e) => handleSearch(e.target.value)}
      />
      {filteredRewardPoints.map((customerId) => (
        <React.Fragment key={customerId}>
          <h2>Customer ID: {customerId}</h2>
          {Object.keys(rewardPoints[customerId]).map((month) => (
            <p key={month}>
              Month: {parseInt(month) + 1} - Points: {rewardPoints[customerId][month]}
            </p>
          ))}
          <p>
            <strong>Total Points for Customer {customerId}: </strong>
            {Object.values(rewardPoints[customerId]).reduce((acc, val) => acc + val, 0)}
          </p>
        </React.Fragment>
      ))}
      <h3>Grand Total Points for All Customers: {overallTotalPoints}</h3>
    </>
  );
};

export default RewardPointsCalculator;
