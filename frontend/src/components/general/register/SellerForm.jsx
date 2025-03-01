// SellerForm.js
import React from "react";
import CommonFields from "./CommonFields";
import PropTypes from "prop-types";

const SellerForm = ({ formValues, handleChange, errors }) => {
  return (
    <>
      <CommonFields
        formValues={formValues}
        handleChange={handleChange}
        errors={errors}
      />
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
          Business Name
        </label>
        <input
          type="text"
          name="businessName"
          placeholder="Enter your business name"
          className="w-full p-2 border rounded-md bg-white dark:text-white text-black dark:bg-slate-900"
          value={formValues.businessName}
          onChange={handleChange}
        />
        {errors.businessName && (
          <p className="text-red-500 text-xs mt-1">{errors.businessName}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
          Registration No.
        </label>
        <input
          type="text"
          name="registrationNo"
          placeholder="Enter your registration number"
          className="w-full p-2 border rounded-md bg-white dark:text-white text-black dark:bg-slate-900"
          value={formValues.registrationNo}
          onChange={handleChange}
        />
        {errors.registrationNo && (
          <p className="text-red-500 text-xs mt-1">{errors.registrationNo}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
          Business Logo
        </label>
        <input
          type="file"
          name="document"
          className="w-full p-2 border rounded-md bg-white dark:text-white text-black dark:bg-slate-900"
          onChange={handleChange}
        />
        {errors.document && (
          <p className="text-red-500 text-xs mt-1">{errors.document}</p>
        )}
      </div>
    </>
  );
};

SellerForm.propTypes = {
  formValues: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

export default SellerForm;