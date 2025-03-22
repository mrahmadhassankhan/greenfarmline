import React, { useEffect, useState } from "react";
import ProductForm from "../../../components/seller/ProductForm";
import { Axios_Node } from "../../../Axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import TriangleLoader from "../../../components/seller/TriangleLoader";

const UpdateProducts = () => {
  const { slug } = useParams();
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
  const [link, setLink] = useState(null);
  const [fields, setFields] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await Axios_Node.get(`/product/${slug}`);

        setLink(response.data.data.document); // Correcting the typo

        setData({
          name: response.data.data.name,
          sku: response.data.data.sku,
          description: response.data.data.description,
          price: response.data.data.price,
          quantity: response.data.data.quantity, // Adding quantity
          brand: response.data.data.brand,
          category: response.data.data.category,
          featured: response.data.data.isFeatured,
          document: response.data.data.document,
        });

        setLoading(false);
      } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong", {
          position: "bottom-right",
        });
        navigate("/seller/products");
      }
    };
    fetchProduct();
  }, []);

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
  const handleInputFileChange = (e) => {
    setData((prevData) => ({
      ...prevData,
      document: e.target.files[0],
    }));
  };
  const handleInputCheckboxChange = (e) => {
    setData((prevData) => ({
      ...prevData,
      featured: e.target.checked, // Boolean value for featured
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return toast.error("Access denied.");
      }
      if (
        !data.name ||
        !data.description ||
        !data.sku ||
        !data.price ||
        !data.brand ||
        !data.category ||
        !data.quantity ||
        !data.document
      ) {
        return toast.error("Please fill all the fields.");
      }

      const response = await Axios_Node.put(
        `/product/update/${slug}`,
        { ...data },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          params: {
            email: JSON.parse(localStorage.getItem("user")).email,
          },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/seller/products");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  if (loading) return <TriangleLoader height="500px" />;
  return (
    <div className="orderMainContainer">
      <h1
        className="cHeader"
        style={{ textAlign: "left", marginBottom: "1rem" }}
      >
        Update Product
      </h1>
      <div className="dashOverview">
        <ProductForm
          link={link}
          data={data}
          handleInputChange={handleInputChange}
          fields={fields}
          name="Update Product"
          changeCategory={changeCategory}
          handleSubmit={handleSubmit}
          changeBrand={changeBrand}
          handleInputChangeName={handleInputChangeName}
          handleInputChangeSku={handleInputChangeSku}
          handleInputChangePrice={handleInputChangePrice}
          handleInputChangeQuantity={handleInputChangeQuantity}
          handleInputFileChange={handleInputFileChange}
          handleInputCheckboxChange={handleInputCheckboxChange}
          handleCancel={() => navigate("/seller/products")}
        />
      </div>
    </div>
  );
};

export default UpdateProducts;
