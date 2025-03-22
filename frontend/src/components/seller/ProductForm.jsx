import React, { useState, useEffect } from "react";
import { Axios_Node } from "../../Axios";

const ProductForm = ({
  data,
  handleInputChange,
  name,
  handleSubmit,
  handleCancel,
  changeCategory,
  changeBrand,
  handleInputChangeName,
  handleInputChangeSku,
  handleInputChangePrice,
  handleInputFileChange,
  handleInputCheckboxChange,
  handleInputChangeQuantity,
}) => {
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await Axios_Node.get("/brands");
        setBrands(response.data.brands);
      } catch (error) {
        toast.error(error?.response?.data?.message || "Error Fetching Brands", {
          position: "bottom-right",
        });
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await Axios_Node.get("/category/addcategory");
        setCategories(response.data.categories); // Ensure correct property
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchBrands();
    fetchCategories();
  }, []);

  return (
    <form
      className="bg-white text-black shadow-lg rounded-lg p-6 max-w-2xl mx-auto space-y-6 border border-gray-200"
      onSubmit={handleSubmit}
    >
      <h2 className="text-3xl font-bold text-gray-800 text-center border-b pb-2">
        {name}
      </h2>
      <div className="space-y-6">
        {/* Input Group */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="input-group">
            <label className="block text-sm font-semibold text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handleInputChangeName}
              required
              className="block w-full rounded-lg border border-gray-300 shadow-sm px-3 py-2 text-gray-900 focus:border-blue-500 focus:ring focus:ring-blue-200 sm:text-sm"
            />
          </div>
          <div className="input-group">
            <label className="block text-sm font-semibold text-gray-700">
              SKU
            </label>
            <input
              type="text"
              name="sku"
              value={data.sku}
              onChange={handleInputChangeSku}
              required
              className="block w-full rounded-lg border border-gray-300 shadow-sm px-3 py-2 text-gray-900 focus:border-blue-500 focus:ring focus:ring-blue-200 sm:text-sm"
            />
          </div>
        </div>

        <div className="input-group">
          <label className="block text-sm font-semibold text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={data.description}
            onChange={handleInputChange}
            required
            className="block w-full rounded-lg border border-gray-300 shadow-sm px-3 py-2 text-gray-900 focus:border-blue-500 focus:ring focus:ring-blue-200 sm:text-sm"
          />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="input-group">
            <label className="block text-sm font-semibold text-gray-700">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={data.price}
              onChange={handleInputChangePrice}
              required
              className="block w-full rounded-lg border border-gray-300 shadow-sm px-3 py-2 text-gray-900 focus:border-blue-500 focus:ring focus:ring-blue-200 sm:text-sm"
            />
          </div>

          <div className="input-group">
            <label className="block text-sm font-semibold text-gray-700">
              Quantity
            </label>
            <input
              type="number"
              name="quantity"
              value={data.quantity}
              onChange={handleInputChangeQuantity}
              required
              className="block w-full rounded-lg border border-gray-300 shadow-sm px-3 py-2 text-gray-900 focus:border-blue-500 focus:ring focus:ring-blue-200 sm:text-sm"
            />
          </div>
        </div>

        <div className="input-group">
          <label className="block text-sm font-semibold text-gray-700">
            Brand
          </label>
          <select
            name="brand"
            value={data.brand}
            onChange={changeBrand}
            required
            className="block w-full rounded-lg border border-gray-300 shadow-sm px-3 py-2 bg-white text-gray-900 focus:border-blue-500 focus:ring focus:ring-blue-200 sm:text-sm"
          >
            <option value="">Select Brand</option>
            {brands.map((brand) => (
              <option key={brand._id} value={brand.name}>
                {brand.name}
              </option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <label className="block text-sm font-semibold text-gray-700">
            Category
          </label>
          <select
            name="category"
            value={data.category}
            onChange={changeCategory}
            required
            className="block w-full rounded-lg border border-gray-300 shadow-sm px-3 py-2 bg-white text-gray-900 focus:border-blue-500 focus:ring focus:ring-blue-200 sm:text-sm"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-4">
          <input
            type="checkbox"
            name="featured"
            checked={data.featured}
            onChange={handleInputCheckboxChange}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label className="text-sm font-semibold text-gray-700">
            Featured
          </label>
        </div>

        <div className="input-group">
          <input
            id="dropzone-file"
            name="document"
            type="file"
            onChange={handleInputFileChange}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 sm:text-sm"
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-between space-y-3 sm:space-y-0">
          <button
            type="submit"
            className="w-full sm:w-auto rounded-lg bg-blue-600 px-6 py-2 text-white font-semibold hover:bg-blue-700 transition-all ease-in-out duration-200"
          >
            {name}
          </button>

          <button
            type="button"
            onClick={handleCancel}
            className="w-full sm:w-auto rounded-lg bg-gray-500 px-6 py-2 text-white font-semibold hover:bg-gray-600 transition-all ease-in-out duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

export default ProductForm;
