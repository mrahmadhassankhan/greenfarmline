// CommonFields.js
import React from "react";
import PropTypes from "prop-types";

const CommonFields = ({ formValues, handleChange, errors }) => {
  return (
    <div>
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
          Full Name
        </label>
        <input
          type="text"
          name="name"
          placeholder="Enter your full name"
          className="w-full p-2 border rounded-md bg-white text-black dark:bg-slate-900 dark:text-white"
          value={formValues.name}
          onChange={handleChange}
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
          Email
        </label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email address"
          className="w-full p-2 border rounded-md bg-white text-black dark:text-white dark:bg-slate-900"
          value={formValues.email}
          onChange={handleChange}
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
          Phone Number
        </label>
        <input
          type="tel"
          name="phoneNumber"
          placeholder="Enter your phone number"
          className="w-full p-2 border rounded-md bg-white dark:text-white text-black dark:bg-slate-900"
          value={formValues.phoneNumber}
          onChange={handleChange}
        />
        {errors.phoneNumber && (
          <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
          Address
        </label>
        <input
          type="text"
          name="address"
          placeholder="Enter your address"
          className="w-full p-2 border rounded-md bg-white dark:text-white text-black dark:bg-slate-900"
          value={formValues.address}
          onChange={handleChange}
        />
        {errors.address && (
          <p className="text-red-500 text-xs mt-1">{errors.address}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
          Password
        </label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          className="w-full p-2 border rounded-md bg-white dark:text-white text-black dark:bg-slate-900"
          value={formValues.password}
          onChange={handleChange}
        />
        {errors.password && (
          <p className="text-red-500 text-xs mt-1">{errors.password}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
          Confirm Password
        </label>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm your password"
          className="w-full p-2 border rounded-md bg-white dark:text-white text-black dark:bg-slate-900"
          value={formValues.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
        )}
      </div>
    </div>
  );
};

CommonFields.propTypes = {
  formValues: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    confirmPassword: PropTypes.string.isRequired,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

export default CommonFields;