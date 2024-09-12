  import React, { useEffect, useState } from "react";
  import { fetchTransactions } from "../services/transactionService";
  import { calculateRewardPoints } from "../utils/calculationUtils";
  import { debounce } from "../utils/debounceUtils";
  import "./RewardPointsCalculator.css"; // Import CSS for styling

  const RewardPointsCalculator = () => {
    const [transactions, setTransactions] = useState([]);
    const [rewardPoints, setRewardPoints] = useState({});
    const [totalPoints, setTotalPoints] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
      const loadTransactions = async () => {
        try {
          setLoading(true);
          const data = await fetchTransactions();
          setTransactions(data);
          const { rewardPointsByCustomer, totalRewardPoints } = calculateRewardPoints(data);
          setRewardPoints(rewardPointsByCustomer);
          setTotalPoints(totalRewardPoints);
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
      return <div className="loading-message">Loading...</div>;
    }

    if (error) {
      return <div className="error-message">Error: {error}</div>;
    }

    // Filter customers by search term
    const filteredCustomers = Object.keys(rewardPoints).filter((customerId) =>
      customerId.toLowerCase().includes(searchTerm.toLowerCase())
    );
  console.log(Object.keys(rewardPoints) )
    return (
      <div className="container">
        <h1>Reward Points Calculator</h1>
        <input
          type="text"
          placeholder="Search by Customer ID"
          onChange={(e) => handleSearch(e.target.value)}
          className="search-input"
        />
        {filteredCustomers.length === 0 ? (
          <div className="no-results-message">No customers found</div>
        ) : (
          filteredCustomers.map((customerId) => (
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
          ))
        )}
        <h3 className="total-points">Grand Total Points for All Customers: {totalPoints}</h3>
      </div>
    );
  };

  export default RewardPointsCalculator;
