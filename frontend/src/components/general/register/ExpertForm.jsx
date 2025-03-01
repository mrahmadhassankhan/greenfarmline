// ExpertForm.js
import React from "react";
import CommonFields from "./CommonFields";
import PropTypes from "prop-types";

const ExpertForm = ({ formValues, handleChange, errors }) => {
  return (
    <>
      <CommonFields
        formValues={formValues}
        handleChange={handleChange}
        errors={errors}
      />
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
          Qualification
        </label>
        <input
          type="text"
          name="qualification"
          placeholder="Enter your qualification"
          className="w-full p-2 border rounded-md bg-white text-black dark:text-white dark:bg-slate-900"
          value={formValues.qualification}
          onChange={handleChange}
        />
        {errors.qualification && (
          <p className="text-red-500 text-xs mt-1">{errors.qualification}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
          Upload document
        </label>
        <input
          type="file"
          name="document"
          className="w-full p-2 border rounded-md bg-white text-black dark:text-white dark:bg-slate-900"
          onChange={handleChange}
        />
        {errors.document && (
          <p className="text-red-500 text-xs mt-1">{errors.document}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
          Years of Experience
        </label>
        <input
          type="number"
          name="yearsOfExperience"
          placeholder="Enter your years of experience"
          className="w-full p-2 border rounded-md bg-white text-black dark:text-white dark:bg-slate-900"
          value={formValues.yearsOfExperience}
          onChange={handleChange}
        />
        {errors.yearsOfExperience && (
          <p className="text-red-500 text-xs mt-1">{errors.yearsOfExperience}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
          Area of Expertise
        </label>
        <input
          type="text"
          name="expertise"
          placeholder="Enter your area of expertise"
          className="w-full p-2 border rounded-md bg-white text-black dark:text-white dark:bg-slate-900"
          value={formValues.expertise}
          onChange={handleChange}
        />
        {errors.expertise && (
          <p className="text-red-500 text-xs mt-1">{errors.expertise}</p>
        )}
      </div>
    </>
  );
};

ExpertForm.propTypes = {
  formValues: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

export default ExpertForm;