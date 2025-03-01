import React, { useContext, useState } from "react";
import FarmerForm from "./FarmerForm";
import SellerForm from "./SellerForm";
import ExpertForm from "./ExpertForm";
import { AuthContext } from "../../../../authContext/auth";
import { Axios_Node } from "../../../Axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const RegisterUserForms = () => {
  const [role, setRole] = useState("farmer");
  const navigate = useNavigate();
  const { register } = useContext(AuthContext);
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

  const validateForm = (formValues, role) => {
    const errors = {};
  
    // Common fields validation
    if (!formValues.name) errors.name = "Name is required";
    if (!formValues.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      errors.email = "Email address is invalid";
    }
    if (!formValues.phoneNumber) {
      errors.phoneNumber = "Phone number is required";
    } else if (!/^03\d{9}$/.test(formValues.phoneNumber)) {
      errors.phoneNumber = "Phone number must start with 03 and be 11 digits long";
    }
    if (!formValues.address) errors.address = "Address is required";
    if (!formValues.password) {
      errors.password = "Password is required";
    } else if (formValues.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }
    if (!formValues.confirmPassword) {
      errors.confirmPassword = "Confirm Password is required";
    } else if (formValues.confirmPassword !== formValues.password) {
      errors.confirmPassword = "Passwords do not match";
    }
  
    // Role-specific validation
    if (role === "seller") {
      if (!formValues.businessName) errors.businessName = "Business Name is required";
      if (!formValues.registrationNo) errors.registrationNo = "Registration No. is required";
      if (!formValues.document) errors.document = "Business Logo is required";
    } else if (role === "expert") {
      if (!formValues.qualification) errors.qualification = "Qualification is required";
      if (!formValues.yearsOfExperience) errors.yearsOfExperience = "Years of Experience is required";
      if (!formValues.expertise) errors.expertise = "Area of Expertise is required";
      if (!formValues.document) errors.document = "Document is required";
    }
  
    return errors;
  };

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

  const errors = validateForm(formValues, role);
  setErrors(errors);

  if (Object.keys(errors).length === 0) {
    const formData = new FormData();

    if (role === "farmer") {
      const farmerData = {
        name: formValues.name,
        email: formValues.email,
        phoneNumber: formValues.phoneNumber,
        address: formValues.address,
        password: formValues.password,
        role: "farmer",
      };

      try {
        const response = await Axios_Node.post("/users/register", farmerData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.data.token) {
          toast.success("Registration Successful");
          register(response.data.token, response.data.user);
          navigate("/");
        }
      } catch (error) {
        toast.error("User Already Exists");
      }
    } else if (role === "seller") {
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
        const response = await Axios_Node.post("/users/register", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (response.data.token) {
          toast.success("Registration Successful");
          register(response.data.token, response.data.user);
          navigate("/seller");
        }
      } catch (error) {
        toast.error("User Already Exists");
      }
    } else if (role === "expert") {
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
        const response = await Axios_Node.post("/users/register", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (response.data.token) {
          toast.success("Registration Successful");
          register(response.data.token, response.data.user);
          navigate("/expert");
        }
      } catch (error) {
        toast.error("User Already Exists");
      }
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
              role === "farmer" ? "bg-green-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setRole("farmer")}
          >
            Farmer
          </button>
          <button
            className={`btn join-item px-4 py-2 ${
              role === "seller" ? "bg-green-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setRole("seller")}
          >
            Seller
          </button>
          <button
            className={`btn join-item rounded-r-full px-4 py-2 ${
              role === "expert" ? "bg-green-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setRole("expert")}
          >
            Expert
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {renderForm()}
          <div className="mt-6">
            <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterUserForms;
