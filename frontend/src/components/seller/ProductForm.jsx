import React from "react";

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
  return (
    <form
      className="bg-white text-white shadow-lg rounded-lg p-6 max-w-2xl mx-auto space-y-6"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-semibold text-gray-800 text-center">
        {name}
      </h2>
      <div className="space-y-4">
        {/* Input Group */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="input-group">
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handleInputChangeName}
              required
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div className="input-group">
            <label className="block text-sm font-medium text-gray-700">
              SKU
            </label>
            <input
              type="text"
              name="sku"
              value={data.sku}
              onChange={handleInputChangeSku}
              required
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="input-group">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={data.description}
            onChange={handleInputChange}
            required
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="input-group">
            <label className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={data.price}
              onChange={handleInputChangePrice}
              required
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="input-group">
            <label className="block text-sm font-medium text-gray-700">
              Quantity
            </label>
            <input
              type="number"
              name="quantity"
              value={data.quantity}
              onChange={handleInputChangeQuantity}
              required
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="input-group">
          <label className="block text-sm font-medium text-gray-700">
            Brand
          </label>
          <select
            name="brand"
            value={data.brand}
            onChange={changeBrand}
            required
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option value="">Select Brand</option>
            <option value="Greenz">Greenz</option>
            <option value="Farmz">Farmz</option>
          </select>
        </div>

        <div className="input-group">
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            name="category"
            value={data.category}
            onChange={changeCategory}
            required
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option value="">Select Category</option>
            <option value="seeds">Seeds</option>
            <option value="instruments">Instruments</option>
            <option value="machinery">Machinery</option>
          </select>
        </div>

        <div className="flex items-center space-x-4">
          <input
            type="checkbox"
            name="featured"
            checked={data.featured}
            onChange={handleInputCheckboxChange}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label className="text-sm font-medium text-gray-700">Featured</label>
        </div>

        <div className="input-group">
          <input
            id="dropzone-file"
            name="document"
            type="file"
            onChange={handleInputFileChange}
            className=""
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between">
          <button
            type="submit"
            className="w-full rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 sm:w-auto"
          >
            {name}
          </button>

          <button
            type="button"
            onClick={handleCancel}
            className="w-full rounded-md bg-gray-500 px-4 py-2 text-sm font-medium text-white hover:bg-gray-600 sm:w-auto"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

export default ProductForm;
