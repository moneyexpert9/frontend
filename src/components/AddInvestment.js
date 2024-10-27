import React, { useState } from "react";
import axios from "axios";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Firebase functions
import { imgDb } from "./firebaseconfig"; // Import Firebase config
import "./InvestmentForm.css"; // Importing CSS for styling
import { Link } from "react-router-dom";

const AddInvestment = () => {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    utrNumber: "",
    dateOfInvestment: "",
    amountOfInvestment: "",
    investmentScreenshot: "",
    dateOfReturn: "",
    returnScreenshot: "",
    returnsGiven:"",
    repaymentDone: "No",
  });

  const [investmentScreenshotFile, setInvestmentScreenshotFile] = useState(null);
  const [returnScreenshotFile, setReturnScreenshotFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "investmentScreenshot") {
      setInvestmentScreenshotFile(files[0]);
    } else if (name === "returnScreenshot") {
      setReturnScreenshotFile(files[0]);
    }
  };

  const uploadFile = async (file, path) => {
    const storageRef = ref(imgDb, path);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let investmentScreenshotUrl = "";
    let returnScreenshotUrl = "";

    try {
      // Upload images to Firebase if selected
      if (investmentScreenshotFile) {
        investmentScreenshotUrl = await uploadFile(
          investmentScreenshotFile,
          `screenshots/investments/${investmentScreenshotFile.name}`
        );
      }
      if (returnScreenshotFile) {
        returnScreenshotUrl = await uploadFile(
          returnScreenshotFile,
          `screenshots/returns/${returnScreenshotFile.name}`
        );
      }

      // Update formData with the URLs
      const updatedFormData = {
        ...formData,
        investmentScreenshot: investmentScreenshotUrl,
        returnScreenshot: returnScreenshotUrl,
      };

      // Send data to backend
      await axios.post("https://backend-2gir.onrender.com/api/investments", updatedFormData);
      alert("Investment Added Successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to add investment");
    }
  };

  return (
    <form className="investment-form" onSubmit={handleSubmit}>
    <h1>Add Investment</h1>
      <div className="form-group">
        <label>Name:</label>
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Phone Number:</label>
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>UTR Number:</label>
        <input
          type="text"
          name="utrNumber"
          placeholder="UTR Number"
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Date of Investment:</label>
        <input
          type="date"
          name="dateOfInvestment"
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Amount of Investment:</label>
        <input
          type="number"
          name="amountOfInvestment"
          placeholder="Amount"
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Investment Screenshot:</label>
        <input type="file" name="investmentScreenshot" onChange={handleFileChange} />
      </div>

      <div className="form-group">
        <label>Date of Return:</label>
        <input type="date" name="dateOfReturn" onChange={handleChange} />
      </div>

      <div className="form-group">
         <label>Return Screenshot:</label>
         <input type="file" name="returnScreenshot" onChange={handleFileChange} />
      </div>
      
      <div className="form-group">
        <label>Returns Given:</label>
        <input
          type="number"
          name="returnsGiven"
          placeholder="Amount"
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Repayment Done:</label>
        <select name="repaymentDone" onChange={handleChange} required>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
      </div>

      <button type="submit" className="submit-btn">
        Submit
      </button>
      <Link to="/"><button className="back-btn">Back</button></Link>
    </form>
  
  );
};

export default AddInvestment;
