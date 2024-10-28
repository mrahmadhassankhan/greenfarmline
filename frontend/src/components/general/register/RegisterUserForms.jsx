import React, { useState } from "react";
import FarmerForm from "./FarmerForm";
import SellerForm from "./SellerForm";
import ExpertForm from "./ExpertForm";
import axios from "axios";

const RegisterUserForms = () => {
  const [userType, setUserType] = useState("farmer");
  const [formValues, setFormValues] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "",
    password: "",
    confirmPassword: "",
    businessName: "",
    registrationNo: "",
    businessLogo: null,
    qualification: "",
    degree: null,
    yearsOfExperience: "",
    expertise: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormValues({ ...formValues, [name]: files[0] });
    } else {
      setFormValues({ ...formValues, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(); // Create a new FormData instance

    // Conditionally append fields to formData
    if (userType === "farmer") {
      formData.append("fullName", formValues.fullName);
      formData.append("email", formValues.email);
      formData.append("phoneNumber", formValues.phoneNumber);
      formData.append("address", formValues.address);
      formData.append("password", formValues.password);
      formData.append("userType", userType);
    } else if (userType === "seller") {
      formData.append("fullName", formValues.fullName);
      formData.append("email", formValues.email);
      formData.append("phoneNumber", formValues.phoneNumber);
      formData.append("address", formValues.address);
      formData.append("password", formValues.password);
      formData.append("businessName", formValues.businessName);
      formData.append("registrationNo", formValues.registrationNo);
      formData.append("businessLogo", formValues.businessLogo); // Only for seller
      formData.append("userType", userType);
    } else if (userType === "expert") {
      formData.append("fullName", formValues.fullName);
      formData.append("email", formValues.email);
      formData.append("phoneNumber", formValues.phoneNumber);
      formData.append("address", formValues.address);
      formData.append("password", formValues.password);
      formData.append("qualification", formValues.qualification);
      formData.append("degree", formValues.degree); // If degree file is needed
      formData.append("yearsOfExperience", formValues.yearsOfExperience);
      formData.append("expertise", formValues.expertise);
      formData.append("userType", userType);
    }

    let apiUrl;

    switch (userType) {
      case "farmer":
        apiUrl = "http://localhost:1783/api/register/registerAsFarmer";
        break;
      case "seller":
        apiUrl = "http://localhost:1783/api/register/registerAsSeller";
        break;
      case "expert":
        apiUrl = "http://localhost:1783/api/register/registerAsExpert";
        break;
      default:
        return;
    }

    try {
      const response = await axios.post(apiUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set the content type
        },
      });
      console.log("Registration successful:", response.data);
    } catch (error) {
      console.error("Error during registration:", error);
      setErrors({ ...errors, form: "Registration failed. Please try again." });
    }
  };

  const renderForm = () => {
    switch (userType) {
      case "farmer":
        return (
          <FarmerForm
            formValues={formValues}
            handleChange={handleChange}
            errors={errors}
          />
        );
      case "seller":
        return (
          <SellerForm
            formValues={formValues}
            handleChange={handleChange}
            errors={errors}
          />
        );
      case "expert":
        return (
          <ExpertForm
            formValues={formValues}
            handleChange={handleChange}
            errors={errors}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <h2 className="text-2xl mb-4">Register as:</h2>
      <select
        onChange={(e) => setUserType(e.target.value)}
        value={userType}
        className="mb-4 p-2 border rounded-md"
      >
        <option value="farmer">Farmer</option>
        <option value="seller">Seller</option>
        <option value="expert">Expert</option>
      </select>
      <form onSubmit={handleSubmit}>
        {renderForm()}
        <button
          type="submit"
          className="mt-4 p-2 bg-blue-500 text-white rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default RegisterUserForms;
