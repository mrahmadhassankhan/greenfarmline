import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Axios_Node } from "../../../Axios";
import { toast } from "react-toastify";
import ProductForm from "../../../components/seller/ProductForm";
import "../../../styles/cartlayout.css";
import "../../../styles/adminDashboard.css";

const AddProducts = () => {
  const [data, setData] = useState({
    name: "",
    description: "",
    sku: "",
    price: "",
    brand: "",
    category: "",
    quantity: "",
    featured: false, // Change to boolean
    document: "",
  });
  const [fields, setFields] = useState([]);
  const navigate = useNavigate();

  // Handle input changes for product details
  const handleInputChange = (e) => {
    setData((prevData) => ({
      ...prevData,
      description: e.target.value,
    }));
  };

  const handleInputChangeName = (e) => {
    setData((prevData) => ({
      ...prevData,
      name: e.target.value,
    }));
  };

  const handleInputChangeSku = (e) => {
    setData((prevData) => ({
      ...prevData,
      sku: e.target.value,
    }));
  };

  const handleInputChangePrice = (e) => {
    setData((prevData) => ({
      ...prevData,
      price: e.target.value,
    }));
  };

  const handleInputChangeQuantity = (e) => {
    setData((prevData) => ({
      ...prevData,
      quantity: e.target.value,
    }));
  };
  // Handle category and brand change
  const changeCategory = (e) => {
    setData((prevData) => ({
      ...prevData,
      category: e.target.value,
    }));
  };

  const changeBrand = (e) => {
    setData((prevData) => ({
      ...prevData,
      brand: e.target.value,
    }));
  };

  const handleInputFileChange = (e) => {
    setData((prevData) => ({
      ...prevData,
      document: e.target.files[0],
    }));
  };

  const changeFields = (newFields) => {
    setFields(newFields);
  };

  const handleInputCheckboxChange = (e) => {
    setData((prevData) => ({
      ...prevData,
      featured: e.target.checked, // Boolean value for featured
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      return toast.error("Access denied.");
    }

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("sku", data.sku);
      formData.append("price", data.price);
      formData.append("brand", data.brand);
      formData.append("category", data.category);
      formData.append("featured", data.featured);
      formData.append("document", data.document);
      formData.append("quantity", data.quantity);
      // Ensure document is not null

      const response = await Axios_Node.post("/product/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        params: {
          email: JSON.parse(localStorage.getItem("user")).email,
        },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/seller/products");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "An error occurred");
      console.error("Error:", error);
    }
  };

  return (
    <div className="orderMainContainer">
      <h1 className="cHeader" style={{ textAlign: "left", margin: "2rem" }}>
        Add New Product
      </h1>
      <div className="dashOverview">
        <ProductForm
          data={data}
          handleInputChange={handleInputChange}
          fields={fields}
          changeFields={changeFields}
          name="Enter Product Details"
          changeCategory={changeCategory}
          changeBrand={changeBrand}
          handleSubmit={handleSubmit}
          handleInputChangeSku={handleInputChangeSku}
          handleInputChangeName={handleInputChangeName}
          handleInputChangePrice={handleInputChangePrice}
          handleInputFileChange={handleInputFileChange}
          handleInputCheckboxChange={handleInputCheckboxChange}
          handleInputChangeQuantity={handleInputChangeQuantity}
          handleCancel={() => navigate("/seller/products")}
        />
      </div>
    </div>
  );
};

export default AddProducts;
