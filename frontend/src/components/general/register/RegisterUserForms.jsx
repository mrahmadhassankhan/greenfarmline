import React, { useState } from "react";
import FarmerForm from "./FarmerForm";
import SellerForm from "./SellerForm";
import ExpertForm from "./ExpertForm";
import axios from "axios";
import { toast } from "react-toastify";

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
      toast.success("Registration Successfull");
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("User Already Exists");
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
    <div className="min-h-screen bg-gray-100 dark:bg-slate-900 flex items-center justify-center py-28 px-4">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 dark:border p-8 rounded-lg shadow-lg">
        <p className="text-sm text-right mb-6">
          Already register?{" "}
          <a href="/login" className="font-bold underline">
            Login
          </a>
        </p>
        <h2 className="text-2xl font-bold text-center mb-6">
          Register as {userType.charAt(0).toUpperCase() + userType.slice(1)}
        </h2>
        <div className="join flex justify-center mb-6">
          <button
            className={`btn join-item rounded-l-full px-4 py-2 ${
              userType === "farmer" ? "bg-lime-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setUserType("farmer")}
          >
            Farmer
          </button>
          <button
            className={`btn join-item px-4 py-2 ${
              userType === "seller" ? "bg-lime-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setUserType("seller")}
          >
            Seller
          </button>
          <button
            className={`btn join-item rounded-r-full px-4 py-2 ${
              userType === "expert" ? "bg-lime-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setUserType("expert")}
          >
            Expert
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {renderForm()}
          <div className="mt-6">
            <button className="w-full bg-lime-500 text-white py-2 rounded-lg hover:bg-lime-600">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterUserForms;
