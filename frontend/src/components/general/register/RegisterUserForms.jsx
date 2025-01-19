import React, { useState } from "react";
import FarmerForm from "./FarmerForm";
import SellerForm from "./SellerForm";
import ExpertForm from "./ExpertForm";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const RegisterUserForms = () => {
  const [role, setRole] = useState("farmer");
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    password: "",
    confirmPassword: "",
    businessName: "",
    registrationNo: "",
    document: "",
    qualification: "",
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

    const formData = new FormData();

    // Conditionally append form fields based on user role
    if (role === "farmer") {
      // Farmer form submission is sent as JSON
      const farmerData = {
        name: formValues.name,
        email: formValues.email,
        phoneNumber: formValues.phoneNumber,
        address: formValues.address,
        password: formValues.password,
        role: "farmer",
      };

      try {
        const response = await axios.post(
          "http://localhost:1783/api/v1/register",
          farmerData, // Send data as JSON for farmers
          {
            headers: {
              "Content-Type": "application/json", // Set Content-Type to JSON for farmers
            },
          }
        );
        toast.success("Registration Successful");
      } catch (error) {
        console.error("Error during registration:", error);
        toast.error("User Already Exists");
      }
    } else if (role === "seller") {
      // Seller form submission is sent as FormData (with file upload)
      formData.append("name", formValues.name);
      formData.append("email", formValues.email);
      formData.append("phoneNumber", formValues.phoneNumber);
      formData.append("address", formValues.address);
      formData.append("password", formValues.password);
      formData.append("role", "seller");
      formData.append("businessName", formValues.businessName);
      formData.append("registrationNo", formValues.registrationNo);
      formData.append("document", formValues.document);

      try {
        const response = await axios.post(
          "http://localhost:1783/api/v1/register",
          formData, // Send data as FormData for seller
          {
            headers: {
              "Content-Type": "multipart/form-data", // Set Content-Type to multipart/form-data for file uploads
            },
          }
        );
        toast.success("Registration Successful");
        navigate("/login");
      } catch (error) {
        console.error("Error during registration:", error);
        toast.error("User Already Exists");
      }
    } else if (role === "expert") {
      // Expert form submission is sent as FormData (with file upload)
      formData.append("name", formValues.name);
      formData.append("email", formValues.email);
      formData.append("phoneNumber", formValues.phoneNumber);
      formData.append("address", formValues.address);
      formData.append("password", formValues.password);
      formData.append("role", "expert");
      formData.append("qualification", formValues.qualification);
      formData.append("yearsOfExperience", formValues.yearsOfExperience);
      formData.append("expertise", formValues.expertise);
      formData.append("document", formValues.document);

      try {
        const response = await axios.post(
          "http://localhost:1783/api/v1/register",
          formData, // Send data as FormData for expert
          {
            headers: {
              "Content-Type": "multipart/form-data", // Set Content-Type to multipart/form-data for file uploads
            },
          }
        );
        toast.success("Registration Successful");
        navigate("/login");
      } catch (error) {
        console.error("Error during registration:", error);
        toast.error("User Already Exists");
      }
    }
  };

  const renderForm = () => {
    switch (role) {
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
    <div className="min-h-screen text-black bg-gray-100 dark:bg-slate-900 flex items-center justify-center py-28 px-4">
      <div className="w-full max-w-2xl bg-white text-black dark:bg-slate-900 dark:border dark:text-white p-8 rounded-lg shadow-lg">
        <p className="text-sm text-right mb-6">
          Already register?{" "}
          <a href="/login" className="font-bold underline">
            Login
          </a>
        </p>
        <h2 className="text-2xl font-bold text-center mb-6">
          Register as {role.charAt(0).toUpperCase() + role.slice(1)}
        </h2>
        <div className="join flex justify-center mb-6">
          <button
            className={`btn join-item rounded-l-full px-4 py-2 ${
              role === "farmer" ? "bg-lime-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setRole("farmer")}
          >
            Farmer
          </button>
          <button
            className={`btn join-item px-4 py-2 ${
              role === "seller" ? "bg-lime-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setRole("seller")}
          >
            Seller
          </button>
          <button
            className={`btn join-item rounded-r-full px-4 py-2 ${
              role === "expert" ? "bg-lime-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setRole("expert")}
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
