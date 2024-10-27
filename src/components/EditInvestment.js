import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Firebase functions
import { imgDb } from "./firebaseconfig"; // Import Firebase config
import "./InvestmentForm.css"; // Importing CSS for styling

const EditInvestment = () => {
  const { id } = useParams(); // Get investment ID from URL params
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

  // Function to convert date from ISO to 'yyyy-MM-dd' format
  const formatDate = (isoDate) => {
    if (!isoDate) return "";
    const date = new Date(isoDate);
    return date.toISOString().split("T")[0];
  };

  useEffect(() => {
    const fetchInvestment = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/investments/${id}`
        );
        const investmentData = response.data;
        // Format the dates for the input fields
        investmentData.dateOfInvestment = formatDate(investmentData.dateOfInvestment);
        investmentData.dateOfReturn = formatDate(investmentData.dateOfReturn);

        setFormData(investmentData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchInvestment();
  }, [id]);

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

    let investmentScreenshotUrl = formData.investmentScreenshot;
    let returnScreenshotUrl = formData.returnScreenshot;

    try {
      // Upload new images to Firebase if selected
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

      // Update formData with the new URLs if changed
      const updatedFormData = {
        ...formData,
        investmentScreenshot: investmentScreenshotUrl,
        returnScreenshot: returnScreenshotUrl,
      };

      // Send updated data to backend
      await axios.put(`https://backend-2gir.onrender.com/api/investments/${id}`, updatedFormData);
      alert("Investment Updated Successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to update investment");
    }
  };

  return (
    <form className="investment-form" onSubmit={handleSubmit}>
    <h1>Edit Investment Details</h1>
      <div className="form-group">
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Phone Number:</label>
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>UTR Number:</label>
        <input
          type="text"
          name="utrNumber"
          value={formData.utrNumber}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Date of Investment:</label>
        <input
          type="date"
          name="dateOfInvestment"
          value={formData.dateOfInvestment}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Amount of Investment:</label>
        <input
          type="number"
          name="amountOfInvestment"
          value={formData.amountOfInvestment}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Investment Screenshot:</label>
        {formData.investmentScreenshot && (
          <div>
            <img src={formData.investmentScreenshot} alt="Investment" width="200" />
          </div>
        )}
        <input type="file" name="investmentScreenshot" onChange={handleFileChange} />
      </div>

      <div className="form-group">
        <label>Date of Return:</label>
        <input
          type="date"
          name="dateOfReturn"
          value={formData.dateOfReturn}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Return Screenshot:</label>
        {formData.returnScreenshot && (
          <div>
            <img src={formData.returnScreenshot} alt="Return" width="200" />
          </div>
        )}
        <input type="file" name="returnScreenshot" onChange={handleFileChange} />
      </div>
      <div className="form-group">
        <label>Returns Given:</label>
        <input
          type="number"
          name="returnsGiven"
          value={formData.returnsGiven}
          onChange={handleChange}
          required
        />
      </div>


      <div className="form-group">
        <label>Repayment Done:</label>
        <select
          name="repaymentDone"
          value={formData.repaymentDone}
          onChange={handleChange}
          required
        >
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
      </div>

      <button type="submit" className="submit-btn">
        Update
      </button>
      <Link to="/"><button className="back-btn">Back</button></Link>
    </form>
  );
};

export default EditInvestment;
