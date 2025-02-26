import React from "react";

function ContactInfo() {
  return (
    <>
      <div className="container md:px-20 px-4 pt-10">
        <div className="text-center my-12">
          <h3 className="text-lg font-bold text-gray-700 dark:text-gray-500">
            Our Contact Information
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Green Farm Line, Lahore, Pakistan
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            Email: support@greenfarmline.com
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            Phone: +923037104782
          </p>
        </div>
      </div>
    </>
  );
}

export default ContactInfo;
