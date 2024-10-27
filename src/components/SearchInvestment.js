import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./HomePage.css"; // External CSS for styling

const SearchInvestment = () => {
  const [searchByPhone, setSearchByPhone] = useState("");
  const [searchByUTR, setSearchByUTR] = useState("");
  const [investmentData, setInvestmentData] = useState(null);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://backend-2gir.onrender.com/api/investments/search`,
        {
          params: {
            phoneNumber: searchByPhone,
            utrNumber: searchByUTR,
          },
        }
      );
      setInvestmentData(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <div className="homepage-container">
      <h1 className="homepage-title">Investment Tracker</h1>

      <div className="search-form">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search by Phone Number"
            value={searchByPhone}
            onChange={(e) => setSearchByPhone(e.target.value)}
            className="search-input"
          />
          <input
            type="text"
            placeholder="Search by UTR Number"
            value={searchByUTR}
            onChange={(e) => setSearchByUTR(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-btn">
            Search
          </button>
        </form>
        <button className="add-btn" onClick={() => navigate("/add")}>
          Add Investment
        </button>
      </div>

      {investmentData && investmentData.length > 0 ? (
        <div className="investment-list">
          {investmentData.map((investment) => (
            <div key={investment._id} className="investment-card">
              <h3>{investment.name}</h3>
              <p>
                <strong>Phone Number:</strong> {investment.phoneNumber}
              </p>
              <p>
                <strong>UTR Number:</strong> {investment.utrNumber}
              </p>
              <p>
                <strong>Amount of Investment:</strong>{" "}
                {investment.amountOfInvestment}
              </p>
              <p>
                <strong>Date of Investment:</strong>{" "}
                {new Date(investment.dateOfInvestment).toLocaleDateString()}
              </p>
              <p>
                <strong>Repayment Done:</strong> {investment.repaymentDone}
              </p>
              <p>
                <strong>Investment Screenshot:</strong>{" "}
                <a href={investment.investmentScreenshot}>Investment Screenshot</a>
              </p>
              <p>
                <strong>Returns Given:</strong>{investment.returnsGiven}
              </p>
              <p>
                <strong>Return Screenshot:</strong>{" "}
                <a href={investment.returnScreenshot || "#"}>Repayment Screenshot</a>
              </p>
              <button
                onClick={() => handleEdit(investment._id)}
                className="edit-btn"
              >
                Edit
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-results">No investments found.</p>
      )}
    </div>
  );
};

export default SearchInvestment;