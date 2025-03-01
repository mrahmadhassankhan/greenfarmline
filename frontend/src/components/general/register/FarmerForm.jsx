import React from "react";
import PropTypes from "prop-types";
import CommonFields from "./CommonFields";

const FarmerForm = ({ formValues, handleChange, errors }) => {
  return (
    <>
      <CommonFields
        formValues={formValues}
        handleChange={handleChange}
        errors={errors}
      />
      {/* Add any additional farmer-specific fields here if needed */}
    </>
  );
};

FarmerForm.propTypes = {
  formValues: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

export default FarmerForm;