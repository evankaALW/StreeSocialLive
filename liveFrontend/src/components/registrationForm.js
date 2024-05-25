import React, { useEffect, useState } from "react";
import axios from 'axios';
import "../styles/registration.css";

export const RegistrationForm = () => {

  const [formData, setFormData] = useState({
    userName: "",
    phoneNumber: "",
    cardID: generateCardId(),
    emailID: "",
    address: "",
    pinCode: "",
    city: "",
    dateOfBirth: "",
    dateTime: "",
    languageSpoken:"",
    loginPIN: "",
    brand:"",
    photo:"",

  });

  const [showPreview, setShowPreview] = useState(false);
  const [brandData, setBrandData] = useState([]);

  const ldate = new Date();
  const formattedDate = ldate.toISOString().slice(0, 10);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    fetch('https://streesocialapi.cinemass.co.in/getbranddetails')
      .then(response => response.json())
      .then(data => {
        setBrandData(data.brandDetails);
      })
      .catch(error => {
        console.error('Error fetching brand data:', error);
      });
  }, []);


  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
  
    reader.onloadend = () => {
      // Convert the image file to a Blob object
      const blob = new Blob([reader.result], { type: file.type });
      setFormData({
        ...formData,
        photo: blob,
      });
    };
  
    if (file) {
      reader.readAsArrayBuffer(file);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowPreview(true);
  };
  
  
  const handleConfirmAndSave = async () => {
    // Save formData to localStorage
    localStorage.setItem("registrationData", JSON.stringify(formData));
    // Clear form data or perform any additional action if needed
  
    if (showPreview) {
      try {
        const response = await fetch('https://streesocialapi.cinemass.co.in/registerUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData), 
        });
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error('Error occurred while registering user:', error);
        // Handle error appropriately
      }
    }
  
    // Log formData after fetch request
    console.log(formData);
  
    setFormData({
      userName: "",
      phoneNumber: "",
      cardID: generateCardId(),
      address: "",
      emailID: "",
      pinCode: "",
      dateTime: "",
      city: "",
      dateOfBirth: "",
      photo:"",
      languageSpoken:"",
      loginPIN: "",
      brand: "",
    });
    setShowPreview(false);
    alert("Data Saved");
  };
  
  
  // Function to generate a random 9-digit card ID
  function generateCardId() {
    return Math.floor(100000000 + Math.random() * 900000000);
  }

  return (
    <div className="registration-form">
      <div className="header-form">
        <img src="01Stree.png" width="280px" alt="" />
      </div>
      <h3>Registration Form</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label class="register" htmlFor="userName">User Name:</label>
          <input
            class="register"
            type="text"
            id="userName"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label class="register" htmlFor="phoneNumber">Phone Number:</label>
          <input
            class="register"
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label class="register" htmlFor="cardID">Card ID:</label>
          <input
            class="register"
            type="text"
            id="cardID"
            name="cardID"
            value={formData.cardID}
            readOnly
          />
        </div>
        <div className="form-group">
          <label class="register" htmlFor="emailID">Email ID:</label>
          <input
            class="register"
            type="text"
            id="emailID"
            name="emailID"
            value={formData.emailID}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label class="register" htmlFor="address">Address:</label>
          <input
            class="register"
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label class="register" htmlFor="pinCode">Pin Code:</label>
          <input
            class="register"
            type="text"
            id="pinCode"
            name="pinCode"
            value={formData.pinCode}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label class="register" htmlFor="city">City:</label>
          <input
            class="register"
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label class="register" htmlFor="dateOfBirth">Date of Birth:</label>
          <input
            class="register"
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label class="register" htmlFor="languageSpoken">Language Spoken:</label>
          <input
            class="register"
            type="text"
            id="languageSpoken"
            name="languageSpoken"
            value={formData.languageSpoken}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
        <label class="register" htmlFor="brand">Brand:</label>
        <select
          class="register"
          id="brand"
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          required
        >
          <option class="register" value="">Select Brand</option>
          {brandData.map(brand => (
            <option class="register" key={brand.id} value={brand.brandName}>
              {brand.brandName}
            </option>
          ))}
        </select>
      </div>
        <div className="form-group">
          <label class="register" htmlFor="dateTime">Date Time:</label>
          <input
            class="register"
            type="datetime-local"
            id="dateTime"
            name="dateTime"
            value={formData.dateTime}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
  <label className="upload" htmlFor="userPhoto">
    Upload User Photo +
  </label>
  <input
    class="register"
    type="file"
    id="userPhoto"
    name="userPhoto"
    onChange={handlePhotoChange}
    accept="image/*"
    style={{ display: 'none' }}
    required
  />
  {formData.photo ? (
    <img
      src={URL.createObjectURL(formData.photo)}
      alt="User"
      className="user-photo"
    />
  ) : (
    <label id="uploadimg" className="upload" htmlFor="userPhoto">
      <img
        src="https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg"
        alt="Default User"
        className="user-photo"
      />
    </label>
  )}
  <br />
</div>
    <button class="registrationButton" type="submit">Submit & Preview</button>
</form>

    {/* Preview section */}
{showPreview && (
  <div className="preview-section">
    <h3>Preview</h3>
    <div className="card">
      <div className="card-content">
        <div className="fdiv">
          <img
            style={{ width: "230px", marginBottom: "-20px" }}
            src="StreeLogo.png"
            alt="Stree Logo"
          />
          <h4>{formData.userName}</h4>
          <p style={{ marginTop: '-20px' }}>Member From: {formattedDate}</p>
          <img
            style={{ width: "70px" }}
            src="https://www.hellotech.com/guide/wp-content/uploads/2020/05/HelloTech-qr-code.jpg"
            alt="qr"
          />
          <p style={{ fontWeight: "bold", marginTop: "-10px" }}>
            {formData.cardID}
          </p>
        </div>
        <div>
          <img
            style={{ width: "70px", marginLeft: "10px" }}
            src="https://rukminim2.flixcart.com/image/850/1000/xif0q/digital-voucher-code/t/i/s/-original-imagn3acm5rja4bw.jpeg?q=90&crop=false"
            alt="Stree Logo"
          />
          {formData.photo && (
            <img
              src={URL.createObjectURL(formData.photo)} // Use createObjectURL to display the Blob image
              alt="User"
              className="user-photo"
            />
          )}
        </div>
      </div>
    </div>
    <br />
    <button class="registrationButton" onClick={handleConfirmAndSave}>Confirm & Save</button>
  </div>
)}

    </div>
  );
};

export default RegistrationForm;
