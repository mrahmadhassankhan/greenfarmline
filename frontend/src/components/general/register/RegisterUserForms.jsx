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
    logo: null,
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

    let apiUrl;
    let payload = {};

    switch (userType) {
      case "farmer":
        apiUrl = "http://localhost:1783/api/register/registerAsFarmer"; // Replace with your actual endpoint
        payload = {
          fullName: formValues.fullName,
          email: formValues.email,
          phoneNumber: formValues.phoneNumber,
          address: formValues.address,
          password: formValues.password,
          userType: userType,
        };
        break;

      case "seller":
        apiUrl = "http://localhost:1783/api/register/registerAsSeller"; // Replace with your actual endpoint
        payload = {
          fullName: formValues.fullName,
          email: formValues.email,
          phoneNumber: formValues.phoneNumber,
          address: formValues.address,
          password: formValues.password,
          businessName: formValues.businessName,
          registrationNo: formValues.registrationNo,
          businessLogo: formValues.logo,
          userType: userType,
        };
        break;

      case "expert":
        apiUrl = "http://localhost:1783/api/register/registerAsExpert"; // Replace with your actual endpoint
        payload = {
          fullName: formValues.fullName,
          email: formValues.email,
          phoneNumber: formValues.phoneNumber,
          address: formValues.address,
          password: formValues.password,
          qualification: formValues.qualification,
          degree: formValues.degree,
          yearsOfExperience: formValues.yearsOfExperience,
          expertise: formValues.expertise,
          userType: userType,
        };
        break;

      default:
        return;
    }

    try {
      const response = await axios.post(apiUrl, payload);
      console.log("Registration successful:", response.data);
      // Handle success (e.g., show a success message, redirect, etc.)
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
